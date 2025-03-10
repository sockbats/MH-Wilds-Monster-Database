from bs4 import BeautifulSoup
from requests import get
import json
from Monster import Monster
from Hitzone import Hitzone


KIRANICO_URL = r"https://mhwilds.kiranico.com"


def get_monster_links() -> list[str]:
    url = KIRANICO_URL + "/data/monsters/"
    site_data = get(url).content
    soup = BeautifulSoup(site_data, "html.parser")

    monster_table = soup.find("table").find_all("tr")
    monster_links = [row.find("a")["href"] for row in monster_table]
    return monster_links


def get_monster_data(site_path: str) -> Monster:
    url = KIRANICO_URL + site_path
    site_data = get(url).content
    soup = BeautifulSoup(site_data, "html.parser")

    monster = Monster(soup.find("h2").text, [])

    tables = soup.find_all("table")
    hitzones_table = tables[1]
    wound_table = tables[2]

    extracts_map = {row.find("td").text: row.find_all("td")[-1].text for row in wound_table.find_all("tr")[1:]}

    for hitzones in hitzones_table.find_all("tr")[1:]:
        hitzone = hitzones.find_all("td")
        monster.hitzones.append(Hitzone(*list(map(lambda x: x.text, hitzone)), extracts_map.get(hitzone[0].text)))

    return monster


def main():
    monster_links = get_monster_links()
    monster_data = [get_monster_data(monster) for monster in monster_links]
    with open("monster_data.json", "w") as f:
        f.write(json.dumps([monster.to_dict() for monster in monster_data], indent=4))


if __name__ == '__main__':
    main()

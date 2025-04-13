from bs4 import BeautifulSoup
from requests import get
import json
from Monster import Monster
from Hitzone import Hitzone

KIRANICO_URL = r"https://mhwilds.kiranico.com"
MH_WIKI_URL = r"https://monsterhunterwiki.org"


def get_monster_links() -> list[str]:
    url = KIRANICO_URL + "/data/monsters/"
    site_data = get(url).content
    soup = BeautifulSoup(site_data, "html.parser")

    monster_table = soup.find("table").find_all("tr")
    monster_links = [row.find("a")["href"] for row in monster_table]
    return monster_links


def get_monster_images():
    url = MH_WIKI_URL + "/wiki/Category:MHWilds_Monster_Icons"
    site_data = get(url).content
    soup = BeautifulSoup(site_data, "html.parser")

    image_table = soup.find("div", {"id": "mw-category-media"}).find_all("div", {"class": "thumb"})
    monster_images = [(item.find("a")["href"].replace("/wiki/File:MHWilds-", "").split("_Icon")[0].replace("_", " "),
                       item.find("img")["src"]) for item in image_table]
    for image in monster_images:
        file_path = f"../public/monster-images/{image[0]}.{image[1].split(".")[-1]}"
        if "Alpha " in file_path or "Frenzied " in file_path or "Tempered " in file_path:
            continue

        image_file = get(image[1]).content
        if "Ceratonoth Female" in file_path:
            file_path = f"../public/monster-images/Ceratonoth (Female).png"
        elif "Ceratonoth" in file_path:
            file_path = f"../public/monster-images/Ceratonoth (Male).png"

        with open(file_path, "wb") as f:
            f.write(image_file)


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

    monster.split_wounded_hitzones()
    monster.remove_nameless_hitzones()
    monster.rename_states()
    return monster


def get_zoh_shia() -> Monster:
    url = KIRANICO_URL + "/data/monsters/zoh-shia"
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

    hitzones = monster.hitzones
    monster.hitzones = [
        # Head
        hitzones[3],
        hitzones[0].rename("Head", "Crystallized"),
        hitzones[4],
        hitzones[11].rename("Head (Darkened)", ""),
        hitzones[12].rename("Head (Darkened)", "Wounds"),
        # Left Wingarm
        hitzones[5],
        hitzones[1].rename("Left Wingarm", "Crystallized"),
        hitzones[6].rename("Left Wingarm", "State_1"),
        hitzones[7],
        hitzones[13].rename("Left Wingarm (Darkened)", ""),
        hitzones[14].rename("Left Wingarm (Darkened)", "State_1"),
        hitzones[15].rename("Left Wingarm (Darkened)", "Wounds"),
        hitzones[16].rename("Left Wingarm (Darkened)", "Weak Point"),
        # Right Wingarm
        hitzones[8],
        hitzones[2].rename("Right Wingarm", "Crystallized"),
        hitzones[9].rename("Right Wingarm", "State_1"),
        hitzones[10],
        hitzones[17].rename("Right Wingarm (Darkened)", ""),
        hitzones[18].rename("Right Wingarm (Darkened)", "State_1"),
        hitzones[19].rename("Right Wingarm (Darkened)", "Wounds"),
        hitzones[20].rename("Right Wingarm (Darkened)", "Weak Point"),
        *hitzones[21:]
    ]

    monster.split_wounded_hitzones()
    monster.remove_nameless_hitzones()
    monster.rename_states()
    return monster


def main():
    # get_monster_images()
    monster_links = get_monster_links()
    # monster_data = [get_monster_data("/data/monsters/rathalos")]
    ignored_monsters = ["/data/monsters/high-purrformance-barrel-puncher", "/data/monsters/dalthydon-livestock",
                        "/data/monsters/zoh-shia"]
    monster_data = [get_monster_data(monster) for monster in monster_links if monster not in ignored_monsters]
    monster_data.append(get_zoh_shia())
    monster_data.sort(key=lambda monster: monster.name)
    with open("monster_data.json", "w") as f:
        f.write(json.dumps([monster.to_dict() for monster in monster_data], indent=4))


if __name__ == '__main__':
    main()

import Hitzone


class Monster:
    def __init__(self, name: str, hitzones: list[Hitzone]):
        self.name = name
        self.hitzones = hitzones
        self.wounded_hitzones = {}

    def split_wounded_hitzones(self):
        self.wounded_hitzones = {hitzone.part_name: hitzone for hitzone in self.hitzones if hitzone.state == "Wounds"}
        self.hitzones = [hitzone for hitzone in self.hitzones if hitzone.state != "Wounds"]

    def to_dict(self):
        return {
            "name": self.name,
            "hitzones": [h.to_dict() for h in self.hitzones],
            "wounded_hitzones": {key: value.to_dict() for key, value in self.wounded_hitzones.items()}
        }

    def remove_nameless_hitzones(self):
        self.hitzones = [hitzone for hitzone in self.hitzones if hitzone.part_name != ""]
        self.wounded_hitzones = {part_name: hitzone for part_name, hitzone in self.wounded_hitzones.items() if part_name != ""}

    def rename_states(self):
        for hitzone in self.hitzones:
            if hitzone.state == "Breakable":
                hitzone.state = "Broken"
        match self.name:
            case "Gore Magala":
                for hitzone in self.hitzones:
                    if hitzone.state == "State_1":
                        hitzone.state = "Frenzy"
            case "Guardian Fulgur Anjanath":
                for hitzone in self.hitzones:
                    if hitzone.state == "State_1":
                        hitzone.state = "State_1"
                    elif hitzone.state == "State_2":
                        hitzone.state = "State_2"
            case "Chatacabra":
                for hitzone in self.hitzones:
                    if hitzone.state == "State_1":
                        hitzone.state = "State_1"
                    elif hitzone.state == "State_2":
                        hitzone.state = "State_2"
                    elif hitzone.state == "State_3":
                        hitzone.state = "State_3"
            case "Rompopolo":
                for hitzone in self.hitzones:
                    if hitzone.state == "State_1":
                        hitzone.state = "State_1"
            case "Nu Udra":
                for hitzone in self.hitzones:
                    if hitzone.state == "State_1":
                        hitzone.state = "State_1"
                    elif hitzone.state == "State_2":
                        hitzone.state = "State_2"
            case "Ajarakan":
                for hitzone in self.hitzones:
                    if hitzone.state == "State_1":
                        hitzone.state = "Enraged"
            case "Guardian Arkveld" | "Arkveld":
                for hitzone in self.hitzones:
                    if hitzone.state == "State_1":
                        hitzone.state = "Powered"
            case "Zoh Shia":
                for hitzone in self.hitzones:
                    if hitzone.state == "State_1":
                        hitzone.state = "State_1"

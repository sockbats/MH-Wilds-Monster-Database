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

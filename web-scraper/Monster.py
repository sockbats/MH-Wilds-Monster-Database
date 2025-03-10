import json
import Hitzone


class Monster:
    def __init__(self, name: str, hitzones: list[Hitzone]):
        self.name = name
        self.hitzones = hitzones

    def to_dict(self):
        return {
            "name": self.name,
            "hitzones": [h.to_dict() for h in self.hitzones]
        }

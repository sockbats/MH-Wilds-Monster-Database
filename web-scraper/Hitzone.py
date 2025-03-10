class Hitzone:
    def __init__(self, part_name: str, state: str, sever: int, blunt: int, ammo: int, 
                 fire: int, water: int, thunder: int, ice: int, dragon: int, stun: int, kinsect_extract: str):
        self.part_name = part_name
        self.state = state
        self.sever = int(sever)
        self.blunt = int(blunt)
        self.ammo = int(ammo)
        self.fire = int(fire)
        self.water = int(water)
        self.thunder = int(thunder)
        self.ice = int(ice)
        self.dragon = int(dragon)
        self.stun = int(stun)
        self.kinsect_extract = kinsect_extract

    def to_dict(self):
        return {
            "part_name": self.part_name,
            "state": self.state,
            "sever": self.sever,
            "blunt": self.blunt,
            "ammo": self.ammo,
            "fire": self.fire,
            "water": self.water,
            "thunder": self.thunder,
            "ice": self.ice,
            "dragon": self.dragon,
            "stun": self.stun,
            "kinsect_extract": self.kinsect_extract
        }
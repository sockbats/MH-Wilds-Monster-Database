# MHWildsMonsterDatabase

This is a tool meant to show the hitzone values of monsters in Monster Hunter Wilds in a clean and intuitive way.

## Notes
Some data is currently missing, since I do not know what some of the states are for some monster,
and Kiranico refers to the as State_#, so I can only guess what they refer to until I do some more testing.\
It is also making the assumption that Weakness Exploit activates on hitzones 45 or greater as it did in previous games.

## How to Use
Website is hosted at https://sockbats.github.io/MH-Wilds-Monster-Database/.

## How to Run Locally
Clone the repository.
If the monster data is out of date, run `web-scraper/web_scraper.py`.\
To launch the website, run `npm install`, then `ng serve`. 
Once the server is running, the page can be found at `http://localhost:4200/`

## Credits
* Monster data sourced from [Kiranico](https://mhwilds.kiranico.com/data/monsters)
* Inspired by stylized databases for [Monster Hunter World](https://robomeche.github.io/MHW-Database/) and [Monster Hunter Rise](https://robomeche.github.io/MHRise-Database/), made by [RoboMechE](https://github.com/RoboMechE)
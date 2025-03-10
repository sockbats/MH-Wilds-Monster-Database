import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
} from "@angular/material/table";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {AsyncPipe} from "@angular/common";
import monster_data from '../../../web-scraper/monster_data.json'

@Component({
  selector: 'app-monster-data',
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    MatInput,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatTable,
    MatHeaderCell,
    ReactiveFormsModule,
    AsyncPipe,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './monster-data.component.html',
  styleUrl: './monster-data.component.css'
})
export class MonsterDataComponent implements OnInit {
  monster_select = new FormControl('');
  displayedColumns = ["part_name", "state", "sever", "blunt", "ammo",
    "fire", "water", "thunder", "ice", "dragon", "stun", "kinsect_extract"];

  monsters = new Map(monster_data.map((monster: any) => [monster.name, monster]));

  monster_names = Array.from(this.monsters.keys());
  filtered_monsters: Observable<string[]> = new Observable();

  selected_monster: {name: string, hitzones: {}[]} = {"name":  "", "hitzones": []};

  ngOnInit() {
    console.log(this.monsters)
    this.filtered_monsters = this.monster_select.valueChanges.pipe(
        startWith(''),
        map(value => this.filter_monsters(value || ''))
    )
  }

  filter_monsters(value: string) {
    return this.monster_names.filter(
        (monster) => monster.toLowerCase().includes(value.toLowerCase())
    );
  }

  select_monster(monster: string) {
    let selected_monster = this.monsters.get(monster);
    if (selected_monster == undefined) {
      return
    }
    this.selected_monster = selected_monster
  }
}

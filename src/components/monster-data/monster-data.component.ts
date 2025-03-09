import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTextColumn
} from "@angular/material/table";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-monster-data',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatTable,
    MatHeaderCell,
    ReactiveFormsModule,
    AsyncPipe,
    MatTextColumn,
    MatCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow
  ],
  templateUrl: './monster-data.component.html',
  styleUrl: './monster-data.component.css'
})
export class MonsterDataComponent implements OnInit {
  monster_select = new FormControl('');
  displayedColumns = ["part", "state", "sever", "blunt", "ammo",
    "fire", "water", "thunder", "ice", "dragon", "stun"];

  monsters = new Map([
      ["Arkveld", {"name": "Arkveld", "hitzones": []}],
      ["Balahara", {"name": "Balahara", "hitzones": []}],
      ["Doshaguma", {"name": "Doshaguma", "hitzones": []}],
      ["Rathalos", {"name": "Rathalos", "hitzones": []}],
      ["Gravios", {"name":  "Gravios", "hitzones": [{
        "name": "Head", "state": "", "sever": 20, "blunt": 28, "ammo": 20,
        "fire": 0, "water": 15, "thunder": 5, "ice": 5, "dragon": 25, "stun": 100
      }]}],
  ]);

  monster_names = Array.from(this.monsters.keys());
  filtered_monsters: Observable<string[]> = new Observable();

  selected_monster: {name: string, hitzones: {}[]} = {"name":  "", "hitzones": []};

  ngOnInit() {
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

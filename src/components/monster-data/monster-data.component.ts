import {Component, OnInit, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource,
} from "@angular/material/table";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {AsyncPipe, NgClass, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {Hitzone} from "../../interfaces/Hitzone"
import monster_data from '../../../web-scraper/monster_data.json'
import {MatCheckbox} from "@angular/material/checkbox";
import {MatSort, MatSortHeader} from "@angular/material/sort";

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
    MatRowDef,
    MatCheckbox,
    NgIf,
    NgClass,
    NgStyle,
    NgOptimizedImage,
    MatSort,
    MatSortHeader
  ],
  templateUrl: './monster-data.component.html',
  styleUrl: './monster-data.component.scss'
})
export class MonsterDataComponent implements OnInit {
  monster_select = new FormControl('');
  displayedColumns = ["part_name", "state", "sever", "blunt", "ammo",
    "fire", "water", "thunder", "ice", "dragon", "stun", "kinsect_extract"];
  show_wounded_parts = false;

  monsters = new Map(monster_data.map((monster: any) => [monster.name, monster]));

  monster_names = Array.from(this.monsters.keys());
  small_monster_names: any[] = [
      "Vespoid", "Conga", "Blango", "Ceratonoth (Male)", "Ceratonoth (Female)", "Dalthydon", "Bulaqchi", "Talioth",
    "Baunos", "Gajios", "Piragill", "Harpios", "Kranodath", "Comaqchi", "Gelidron", "Rafma", "Porkeplume",
    "Nerscylla Hatchling", "Guardian Seikret"];
  filtered_monsters: Observable<string[]> = new Observable();

  selected_monster: {name: string, hitzones: Hitzone[], wounded_hitzones: Map<string, Hitzone>} = {"name":  "", "hitzones": [], "wounded_hitzones": new Map};
  data_source = new MatTableDataSource(this.selected_monster.hitzones)
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.filtered_monsters = this.monster_select.valueChanges.pipe(
        startWith(''),
        map(value => this.filter_monsters(value || ''))
    )
    // Remove small_monsters unless checked
    this.monster_names = this.monster_names.filter(name => !this.small_monster_names.includes(name))
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
    if (!(this.selected_monster.wounded_hitzones instanceof Map)) {
      this.selected_monster.wounded_hitzones = new Map<string, Hitzone>(Object.entries(selected_monster.wounded_hitzones))
    }
    console.log(this.selected_monster)
    setTimeout(() => document.getElementById("monster_select_input")!.blur(), 50)
    this.data_source.data = this.selected_monster.hitzones
    this.data_source.sort = this.sort
  }

  clear_input() {
    this.monster_select.setValue("");
  }

  toggle_wounded_parts(is_checked: boolean) {
    this.show_wounded_parts = is_checked
  }

  get_element_color(element: string, value: number) {
    switch (element) {
      case "fire":
        return ['#c3ac79', '#f4cccc', '#ea9999', '#e06666', '#d63333', '#cc0000', '#990000', '#660000'][Math.min(Math.floor(value / 5), 7)];
      case "water":
        return ['#c3ac79', '#c9daf8', '#a4c2f4', '#6d9eeb', '#558be2', '#3c78d8', '#1155cc', '#1c4587'][Math.min(Math.floor(value / 5), 7)];
      case "thunder":
        return ['#c3ac79', '#fff2cc', '#ffe599', '#ffd966', '#f8ce4c', '#f1c232', '#bf9000', '#7f6000'][Math.min(Math.floor(value / 5), 7)];
      case "ice":
        return ['#c3ac79', '#d0e0e3', '#a2c4c9', '#76a5af', '#5e939f', '#45818e', '#134f5c', '#0c343d'][Math.min(Math.floor(value / 5), 7)];
      case "dragon":
        return ['#c3ac79', '#d9d2e9', '#b4a7d6', '#8e7cc3', '#7b65b5', '#674ea7', '#351c75', '#20124d'][Math.min(Math.floor(value / 5), 7)];
      default:
        return '#c3ac79'
    }
  }

  get_kinsect_extract(extract_color: string) {
    switch (extract_color) {
      case "GREEN":
        return "kinsect_extracts/kinsect_extract_green.png"
      case "RED":
        return "kinsect_extracts/kinsect_extract_red.png"
      case "WHITE":
        return "kinsect_extracts/kinsect_extract_white.png"
      case "ORANGE":
        return "kinsect_extracts/kinsect_extract_orange.png"
      default:
        return "kinsect_extracts/kinsect_extract.png"
    }
  }

  toggle_small_monsters(checked: boolean) {
    if (!checked) {
      this.monster_names = this.monster_names.filter(name => !this.small_monster_names.includes(name))
    }
    else {
      this.monster_names = this.monster_names.concat(this.small_monster_names)
    }
  }
}

import { Component } from '@angular/core';

type FamilyGroup = {
  title: string;
  names: string[];
};

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent {
  selectedGodparentIndex = 0;

  parentsGroups: FamilyGroup[] = [
    {
      title: 'Padres de la novia',
      names: ['Gustavo Romo López', 'Verónica Correa Díaz']
    },
    {
      title: 'Padres del novio',
      names: ['Francisco Javier Cruz Díaz', 'Josefina Jáuregui Guzmán']
    }
  ];

  godparentsGroups: FamilyGroup[] = [
    {
      title: 'Velación',
      names: ['Rigoberto Romo López', 'Ángeles Mora Sandoval']
    },
    {
      title: 'Lazo',
      names: ['Miriam Verónica de la Torre Agosto', 'Evelyn del Real Padilla']
    },
    {
      title: 'Anillos',
      names: ['Jorge Barba Vázquez', 'Ana Lilia Agripino Flores']
    },
    {
      title: 'Arras',
      names: ['Ramiro de Jesús Gutiérrez Piedra', 'Ana Carolina Alanís Chávez']
    },
    {
      title: 'Biblia y Rosario',
      names: ['Por confirmar']
    },
    {
      title: 'Ramos',
      names: ['Por confirmar']
    }
  ];

  get selectedGodparent(): FamilyGroup {
    return this.godparentsGroups[this.selectedGodparentIndex];
  }

  previousGodparent(): void {
    this.selectedGodparentIndex = this.getCircularIndex(this.selectedGodparentIndex - 1);
  }

  nextGodparent(): void {
    this.selectedGodparentIndex = this.getCircularIndex(this.selectedGodparentIndex + 1);
  }

  selectGodparent(index: number): void {
    this.selectedGodparentIndex = index;
  }

  private getCircularIndex(index: number): number {
    return (index + this.godparentsGroups.length) % this.godparentsGroups.length;
  }
}

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

  parentsGroups: FamilyGroup[] = [
    {
      title: 'Padres de la novia',
      names: ['Gustavo Romo Lopez', 'Veronica Correa Diaz']
    },
    {
      title: 'Padres del novio',
      names: ['Francisco Javier Cruz Diaz', 'Josefina Jauregui Guzman']
    }
  ];

  godparentsGroups: FamilyGroup[] = [
    {
      title: 'Padrinos de Velación',
      names: ['Rigoberto Romo Lopez ', 'Angeles Mora Sandoval']
    },
    {
      title: 'Padrinos de Lazo',
      names: ['Por confirmar']
    },
    {
      title: 'Padrinos de Anillos',
      names: ['Jorge Barba Vázquez', 'Ana Lilia Agripino Flores']
    },
    {
      title: 'Padrinos de Arras',
      names: ['Ramiro De Jesus Guiterrez Piedra', 'Ana Carolina Alanis Chavez']
    },
    {
      title: 'Padrinos de Biblia y Rosario',
      names: ['Por confirmar']
    },
    {
      title: 'Madrinas de Ramos',
      names: ['Por confirmar']
    }
  ];

}

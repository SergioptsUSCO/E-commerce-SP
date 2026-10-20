import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OrdenesModelo } from '../models/modelo-ordenes';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonInput,
  IonSelect,
  IonSearchbar,
  IonList,
  IonItem,
  IonAvatar,
  IonBadge,
  IonModal,
  ToastController,
  IonButton,
  IonAlert,
  IonContent,
  IonLabel,

} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  phonePortraitOutline,
  createOutline,
  documentTextOutline,
  paperPlaneOutline,
  closeCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  FormsModule,
  CommonModule,
  IonText,
  IonCard,
  IonGrid,
  IonInput,
  IonSelect,
  IonSearchbar,
  IonList,
  IonItem,
  IonAvatar,
  IonBadge,
  IonModal,
  IonButton,
  IonAlert,
  IonLabel,
  ],
})

export class HomePage implements OnInit {
  private apiService = inject(ApiService);
  ordenes: OrdenesModelo[] = [];
  precioMaximo: number | null = null;
  private precioMaximoAplicado: number | null = null;

  get ordenesFiltradas(): OrdenesModelo[] {
    if (this.precioMaximoAplicado === null) {
      return this.ordenes;
    }

    return this.ordenes.filter((orden) => orden.price <= this.precioMaximoAplicado!);
  }

  aplicarFiltro(): void {
    this.precioMaximoAplicado = this.precioMaximo;
  }

  ngOnInit() {
    this.apiService.getItems().subscribe({
      next: (data) => {
        this.ordenes = data.map((u:any): OrdenesModelo => ({
          userId: u.userId,
          id: u.id,
          title: u.title,
          body: u.body,
          stock: Math.floor(Math.random() * 100),
          price: Math.floor(Math.random() * 10000)
        }));
      },
      error: (err) => console.error(err)
    });
  }


}

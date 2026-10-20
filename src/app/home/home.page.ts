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
  private toastController = inject(ToastController);
  ordenes: OrdenesModelo[] = [];
  precioMinimo: number | null = null;
  precioMaximo: number | null = null;
  modalFiltroAbierto = false;
  private precioMinimoAplicado: number | null = null;
  private precioMaximoAplicado: number | null = null;

  get ordenesFiltradas(): OrdenesModelo[] {
    if (this.precioMinimoAplicado === null && this.precioMaximoAplicado === null) {
      return this.ordenes;
    }

    return this.ordenes.filter((orden) => {
      const minCondicion = this.precioMinimoAplicado === null || orden.price >= this.precioMinimoAplicado!;
      const maxCondicion = this.precioMaximoAplicado === null || orden.price <= this.precioMaximoAplicado!;
      return minCondicion && maxCondicion;
    });
  }

  abrirModalFiltro(): void {
    this.modalFiltroAbierto = true;
  }

  async continuarFiltro(): Promise<void> {
    await this.aplicarFiltro();
    this.modalFiltroAbierto = false;
  }

  async aplicarFiltro(): Promise<void> {
    if (this.precioMaximo !== null && this.precioMaximo < 0) {
      this.precioMaximoAplicado = null;
      const toast = await this.toastController.create({
        message: 'El precio no puede ser negativo. Se mostrará la lista completa.',
        duration: 2500,
        position: 'bottom'
      });
      await toast.present();
      return;
    }

    this.precioMaximoAplicado = this.precioMaximo;
    this.precioMinimoAplicado = this.precioMinimo;

    if (this.precioMaximoAplicado !== null && this.precioMaximoAplicado > 0) {
    const toast = await this.toastController.create({
      message: 'Filtro de precio aplicado',
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
    }
    else if (this.precioMaximoAplicado === null) {
      const toast = await this.toastController.create({
        message: 'Filtro de precio eliminado',
        duration: 2500,
        position: 'bottom'
      });
      await toast.present();
    }
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
      error: (err) => {
        console.error('Error al cargar las órdenes:', err);
      }
    });
  }


}

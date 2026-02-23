// confirma-asistencia.component.ts
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { InvitationResponse, Ticket, TicketQr } from '../models/invitation.model';
import { InvitationService } from '../services/invitation.service';

interface TicketSelectable extends Ticket {
  selected: boolean;
}

@Component({
  selector: 'app-confirma-asistencia',
  templateUrl: './confirma-asistencia.component.html',
  styleUrls: ['./confirma-asistencia.component.css']
})
export class ConfirmaAsistenciaComponent implements OnChanges {
  @Input() data!: InvitationResponse;
  @Input() token!: string;
  @Output() invitationUpdated = new EventEmitter<void>();

  tickets: TicketSelectable[] = [];
  confirming = false;
  confirmSuccess = false;
  confirmError: string | null = null;

  // QRs Modal state
  showTicketModal = false;
  loadingQrs = false;
  ticketQrs: TicketQr[] = [];
  qrError: string | null = null;

  constructor(private invitationSvc: InvitationService) { }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.data?.tickets) {
      this.tickets = this.data.tickets.map(t => ({
        ...t,
        selected: false
      }));
      // Reset messages on data reload
      this.confirmSuccess = false;
      this.confirmError = null;
    }
  }

  /** Tickets pendientes (no confirmados) */
  get pendingTickets(): TicketSelectable[] {
    return this.tickets.filter(t => !t.confirmed);
  }

  /** Tickets ya confirmados */
  get confirmedTickets(): TicketSelectable[] {
    return this.tickets.filter(t => t.confirmed);
  }

  /** ¿Hay tickets seleccionados para confirmar? */
  get hasSelectedTickets(): boolean {
    return this.pendingTickets.some(t => t.selected);
  }

  /** ¿Todos los tickets están confirmados? */
  get allConfirmed(): boolean {
    return this.tickets.length > 0 && this.tickets.every(t => t.confirmed);
  }

  /** ¿Hay algún ticket confirmado para ver? */
  get canViewTickets(): boolean {
    return this.confirmedTickets.length > 0;
  }

  /** Formatear la fecha del evento */
  get formattedDate(): string {
    if (!this.data?.event?.eventDate) return '';
    const d = new Date(this.data.event.eventDate);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    };
    return d.toLocaleDateString('es-MX', options);
  }

  /** Confirmar los tickets seleccionados */
  confirmSelected(): void {
    const selectedIds = this.pendingTickets
      .filter(t => t.selected)
      .map(t => t.id);

    if (selectedIds.length === 0) return;

    this.confirming = true;
    this.confirmError = null;
    this.confirmSuccess = false;

    this.invitationSvc.confirmTickets(this.token, selectedIds).subscribe({
      next: () => {
        this.confirming = false;
        this.confirmSuccess = true;
        // Pedir a AppComponent que recargue los datos
        this.invitationUpdated.emit();
      },
      error: (err) => {
        console.error('Error al confirmar:', err);
        this.confirming = false;
        this.confirmError = 'No se pudo confirmar. Intenta de nuevo.';
      }
    });
  }

  /** Cargar y mostrar modal de boletos con QR */
  openTicketModal(): void {
    console.log('Abriendo modal de boletos para token:', this.token);
    if (!this.token) return;

    this.showTicketModal = true;
    this.loadingQrs = true;
    this.qrError = null;
    this.ticketQrs = [];

    this.invitationSvc.getTicketsQr(this.token).subscribe({
      next: (qrs) => {
        this.ticketQrs = qrs;
        this.loadingQrs = false;
      },
      error: (err) => {
        console.error('Error fetching QRs:', err);
        this.qrError = 'No se pudieron cargar los códigos QR. Por favor intenta más tarde.';
        this.loadingQrs = false;
      }
    });
  }

  closeTicketModal(): void {
    this.showTicketModal = false;
  }

  /** Seleccionar/deseleccionar todos los pendientes */
  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.pendingTickets.forEach(t => t.selected = checked);
  }
}


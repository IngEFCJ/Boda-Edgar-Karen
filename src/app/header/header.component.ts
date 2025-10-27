/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  @Input() basePath = '/assets/invitaciones/karen-edgar/v1/';
  @ViewChild('audioPlayer') audioPlayer?: ElementRef<HTMLAudioElement>;

  menuOpen = false;
  isMusicOn = true;
  private userInteracted = false;

  get logoSrc() { return `${this.basePath}images/logos/logo-header.png`; }
  get audioSrc() { return `${this.basePath}audio/theme.mp3`; }

  ngAfterViewInit() {
    const audio = this.audioPlayer?.nativeElement;
    if (!audio) return;
    audio.src = this.audioSrc;
    audio.loop = true;
    audio.muted = true;
    audio.play().catch(() => { });
  }

  @HostListener('document:click')
  @HostListener('document:keydown')
  enableSoundOnFirstInteraction() {
    if (this.userInteracted) return;
    this.userInteracted = true;
    const audio = this.audioPlayer?.nativeElement;
    if (audio && this.isMusicOn) {
      audio.muted = false;
      audio.play().catch(() => { });
    }
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu() { this.menuOpen = false; }

  toggleMusic() {
    const audio = this.audioPlayer?.nativeElement;
    this.isMusicOn = !this.isMusicOn;
    if (!audio) return;
    if (this.isMusicOn) { audio.muted = !this.userInteracted; audio.play().catch(() => { }); }
    else { audio.pause(); }
  }

  onImgError(e: Event) {
    (e.target as HTMLImageElement).src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuMBg4yHq+QAAAAASUVORK5CYII=';
  }
}

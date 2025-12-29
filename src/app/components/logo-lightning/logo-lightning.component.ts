import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-logo-lightning',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './logo-lightning.component.html',
    styleUrl: './logo-lightning.component.scss'
})
export class LogoLightningComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('lightningCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;
    private intervalId: any;
    private animationFrameId: any;
    private width = 0;
    private height = 0;
    private bolts: { segments: { x: number, y: number }[], opacity: number }[] = [];

    ngOnInit() {
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }

    ngAfterViewInit() {
        this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
        this.resizeCanvas();

        // Start continuous animation
        this.animate();

        // Add new bolts periodically
        this.intervalId = setInterval(() => {
            this.addNewBolt();
        }, 1500); // Add new bolt every 1.5 seconds
    }

    ngOnDestroy() {
        if (this.intervalId) clearInterval(this.intervalId);
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        window.removeEventListener('resize', this.resizeCanvas.bind(this));
    }

    private resizeCanvas() {
        if (!this.canvasRef) return;
        const parent = this.canvasRef.nativeElement.parentElement;
        if (parent) {
            this.width = parent.offsetWidth;
            this.height = parent.offsetHeight;
            this.canvasRef.nativeElement.width = this.width;
            this.canvasRef.nativeElement.height = this.height;
        }
    }

    private addNewBolt() {
        // Random position around the canvas
        const side = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        let startX, startY, endX, endY;

        switch (side) {
            case 0: // Top
                startX = Math.random() * this.width;
                startY = 0;
                endX = startX + (Math.random() * 30 - 15);
                endY = this.height * 0.3;
                break;
            case 1: // Right
                startX = this.width;
                startY = Math.random() * this.height;
                endX = this.width * 0.7;
                endY = startY + (Math.random() * 30 - 15);
                break;
            case 2: // Bottom
                startX = Math.random() * this.width;
                startY = this.height;
                endX = startX + (Math.random() * 30 - 15);
                endY = this.height * 0.7;
                break;
            default: // Left
                startX = 0;
                startY = Math.random() * this.height;
                endX = this.width * 0.3;
                endY = startY + (Math.random() * 30 - 15);
        }

        const segments = this.generateLightningSegments({ x: startX, y: startY }, { x: endX, y: endY }, 20);
        this.bolts.push({ segments, opacity: 1 });

        // Limit number of bolts
        if (this.bolts.length > 4) {
            this.bolts.shift();
        }
    }

    private generateLightningSegments(start: { x: number, y: number }, end: { x: number, y: number }, displacement: number): { x: number, y: number }[] {
        if (displacement < 1.5) {
            return [start, end];
        }

        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        const offsetX = (Math.random() - 0.5) * displacement;
        const offsetY = (Math.random() - 0.5) * displacement;
        const mid = { x: midX + offsetX, y: midY + offsetY };

        const firstHalf = this.generateLightningSegments(start, mid, displacement / 2);
        const secondHalf = this.generateLightningSegments(mid, end, displacement / 2);

        return [...firstHalf, ...secondHalf.slice(1)];
    }

    private animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Update and draw all bolts
        this.bolts = this.bolts.filter(bolt => {
            bolt.opacity -= 0.02; // Fade out

            if (bolt.opacity > 0) {
                this.ctx.beginPath();
                this.ctx.lineWidth = 1.5;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.shadowBlur = 8;
                this.ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
                this.ctx.strokeStyle = `rgba(255, 230, 20, ${bolt.opacity})`;

                this.ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);
                for (let i = 1; i < bolt.segments.length; i++) {
                    this.ctx.lineTo(bolt.segments[i].x, bolt.segments[i].y);
                }
                this.ctx.stroke();
                return true;
            }
            return false;
        });

        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
}

import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-lightning-effect',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lightning-effect.component.html',
    styleUrl: './lightning-effect.component.scss'
})
export class LightningEffectComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() minX = 0.6; // Start range min (0-1)
    @Input() maxX = 0.9; // Start range max (0-1)
    @Input() interval = 5000;
    @Input() delay = 1000;

    @ViewChild('lightningCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;
    private intervalId: any;
    private animationFrameId: any;
    private width = 0;
    private height = 0;
    private sparks: { x: number, y: number }[][] | null = null;

    ngOnInit() {
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }

    ngAfterViewInit() {
        this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
        this.resizeCanvas();

        // Initial bolt
        setTimeout(() => this.triggerLightning(), this.delay);

        // Recurring
        this.intervalId = setInterval(() => {
            this.triggerLightning();
        }, this.interval);
    }

    ngOnDestroy() {
        if (this.intervalId) clearInterval(this.intervalId);
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        window.removeEventListener('resize', this.resizeCanvas.bind(this));
    }

    private resizeCanvas() {
        if (!this.canvasRef) return;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvasRef.nativeElement.width = this.width;
        this.canvasRef.nativeElement.height = this.height;
    }

    private triggerLightning() {
        // Clear previous
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Generate bolt points (Midpoint Displacement)
        // Use inputs for range
        const rangeWidth = this.maxX - this.minX;
        const startX = this.width * (this.minX + Math.random() * rangeWidth);
        const startY = 0;
        const endX = startX + (Math.random() * 100 - 50); // Slight drift
        const endY = this.height * 0.6; // Go down to 60% of screen height

        const segments = this.generateLightningSegments({ x: startX, y: startY }, { x: endX, y: endY }, 100);

        // Animate drawing
        this.animateBolt(segments);
    }

    private generateLightningSegments(start: { x: number, y: number }, end: { x: number, y: number }, displacement: number): { x: number, y: number }[] {
        if (displacement < 3) {
            return [start, end];
        }

        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;

        // Add random displacement perpendicular to the line direction would be ideal,
        // but simple random offset works for lightning chaos.
        const offsetX = (Math.random() - 0.5) * displacement;
        const offsetY = (Math.random() - 0.5) * displacement;

        const mid = { x: midX + offsetX, y: midY + offsetY };

        const firstHalf = this.generateLightningSegments(start, mid, displacement / 2);
        const secondHalf = this.generateLightningSegments(mid, end, displacement / 2);

        return [...firstHalf, ...secondHalf.slice(1)];
    }

    private animateBolt(segments: { x: number, y: number }[]) {
        let opacity = 1;
        let lightingIntensity = 1.0;

        // Determine impact point (last segment)
        const impactX = segments[segments.length - 1].x;
        const impactY = segments[segments.length - 1].y;

        const animate = () => {
            this.ctx.clearRect(0, 0, this.width, this.height);

            if (lightingIntensity <= 0.01 && opacity <= 0.01) {
                // Animation finished
                return;
            }

            // 1. Darkening Effect (Contrast)
            // Draw a radial gradient that is transparent in the center and dark at the edges
            // Center it on the impact point so the "light" comes from there
            const maxRadius = Math.max(this.width, this.height) * 1.5;
            const darkGradient = this.ctx.createRadialGradient(impactX, impactY, 0, impactX, impactY, maxRadius);

            // Inner circle is fully transparent (the lit area)
            // As we move out, it gets darker
            darkGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
            darkGradient.addColorStop(0.3, 'rgba(0, 0, 0, 0)'); // Keep a decent sized area clear
            darkGradient.addColorStop(1, `rgba(0, 0, 0, ${0.5 * lightingIntensity})`); // Dark edges

            this.ctx.fillStyle = darkGradient;
            this.ctx.fillRect(0, 0, this.width, this.height);


            // 2. Draw Lightning Bolt
            if (opacity > 0) {
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';

                // Glow effect for the bolt itself
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = 'rgba(255, 215, 0, 0.8)'; // Gold glow
                this.ctx.strokeStyle = `rgba(255, 255, 240, ${opacity})`; // White-ish core

                this.ctx.moveTo(segments[0].x, segments[0].y);
                for (let i = 1; i < segments.length; i++) {
                    this.ctx.lineTo(segments[i].x, segments[i].y);
                }
                this.ctx.stroke();
            }

            // Update state
            // Bolt fades fast (flash)
            opacity -= 0.05;

            // Environment lighting fades slower (1.5s approx)
            // 1.5s * 60fps = 90 frames. 1.0 / 90 ~= 0.011
            lightingIntensity -= 0.011;

            this.animationFrameId = requestAnimationFrame(animate);
        };

        animate();
    }
}

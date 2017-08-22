import Ticker = PIXI.ticker;
import Point = PIXI.Point;

export class Main {

    private renderer: PIXI.SystemRenderer;

    private stage: PIXI.Container;

    constructor() {

        const width = this.getWidth();
        const height = this.getHeight();

        this.renderer = PIXI.autoDetectRenderer(width, height);
        document.body.appendChild(this.renderer.view);

        this.stage = new PIXI.Container();

        window.addEventListener("resize", () => this.onResize(), true);

        Ticker.shared.add(this.onTickUpdate, this);

    }

    private onTickUpdate(): void {
        this.renderer.render(this.stage);
    }

    private onResize() {
        const width = this.getWidth();
        const height = this.getHeight();

        const canvas = this.renderer.view;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        this.renderer.resize(width, height);
    }

    private getWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth);
    }

    private getHeight() {
        return document.documentElement.clientHeight
    }
}

new Main();

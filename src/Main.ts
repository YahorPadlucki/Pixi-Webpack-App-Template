import Ticker = PIXI.ticker;
import Container = PIXI.Container;

export class Main {

    private renderer: PIXI.SystemRenderer;

    private stage: PIXI.Container;

    private bunnyContainer: Container = new Container();

    private bunnyImageUrl: string = "../assets/bunny.png";

    constructor() {

        const width = this.getWidth();
        const height = this.getHeight();

        this.renderer = PIXI.autoDetectRenderer(width, height);
        this.renderer.backgroundColor=0xffffff;
        document.body.appendChild(this.renderer.view);

        this.stage = new PIXI.Container();

        this.stage.addChild(this.bunnyContainer);



        const addButton  = new PIXI.Graphics();
        addButton.beginFill(0x00FF00);
        addButton.drawRect(0, 0, 50, 25);
        addButton.endFill();
        addButton.interactive = true;
        addButton.position.set(800, 600);
        addButton.on('pointerdown', () => this.addBunny());
        this.stage.addChild(addButton);

        window.addEventListener("resize", () => this.onResize(), true);

        Ticker.shared.add(this.onTickUpdate, this);

    }

    private addBunny(): void {
        const bunny = PIXI.Sprite.fromImage(this.bunnyImageUrl);
        bunny.anchor.set(0.5);

        const blurFilter = new PIXI.filters.BlurFilter();
        blurFilter.blur = 3;

        const bunnyShadow = PIXI.Sprite.fromImage(this.bunnyImageUrl);
        bunnyShadow.anchor.set(0.5);
        bunnyShadow.filters = [blurFilter];
        bunnyShadow.tint = 0;
        const x = Math.random() * 800;
        const y = Math.random() * 600;

        bunny.x = x;
        bunny.y = y;

        bunnyShadow.x = x + 2;
        bunnyShadow.y = y + 2;

        this.bunnyContainer.addChild(bunnyShadow);
        this.bunnyContainer.addChild(bunny);
    }

    private destroy(): void {
        this.stage.removeChild(this.bunnyContainer);
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

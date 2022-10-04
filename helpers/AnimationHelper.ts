export default class AnimationHelper {

    private static animationOptions: KeyframeAnimationOptions = {
        duration: 500,
        fill: 'forwards'
    };

    private static tablePositions = [
        {
            top: '33vh',
            transform: 'scale(0.4) rotateX(45deg)'
        },
        {
            top: '33vh',
            transform: 'scale(1) rotateX(45deg)'
        },
        {
            top: 0,
            transform: 'scale(1) rotateX(0)'
        }
    ];

    private static roomPositions = [
        {
            transform: 'scale(1) rotateX(0)',
            filter: 'blur(0)',
            top: 0
        },
        {
            transform: 'scale(1.9)',
            filter: 'blur(10px)',
            top: 0
        },
        {
            top: '-33vh',
            filter: 'blur(10px)',
            transform: 'scale(1.9) rotateX(-40deg)'
        }
    ];

    
    public static zoomIntoPicture(sceneDom: HTMLDivElement, animationFinished: () => void) {
        sceneDom.animate([
            {
                transform: 'scale(1)',
                bottom: 0
            },
            {
                transform: 'scale(2)',
                bottom: '33vh'
            }
        ], this.animationOptions);
    }


    public static zoomIn(sceneDom: HTMLDivElement, animationFinished: () => void) {
        const table = sceneDom.getElementsByClassName('table')[0] as HTMLDivElement;
        const room = sceneDom.getElementsByClassName('room')[0] as HTMLDivElement;

        room.animate([
            this.roomPositions[0],
            this.roomPositions[1],
        ], this.animationOptions);

        table.animate([
            this.tablePositions[0],
            this.tablePositions[1],
        ], this.animationOptions).addEventListener('finish', () => {
            table.animate([
                this.tablePositions[1],
                this.tablePositions[2],
            ], this.animationOptions);

            room.animate([
                this.roomPositions[1],
                this.roomPositions[2],
            ], this.animationOptions).addEventListener('finish', () => {
                animationFinished();
            });
        });
    }

    public static zoomOut(sceneDom: HTMLDivElement, animationFinished: () => void) {
        const table = sceneDom.getElementsByClassName('table')[0] as HTMLDivElement;
        const room = sceneDom.getElementsByClassName('room')[0] as HTMLDivElement;
        
        room.animate([
            this.roomPositions[2],
            this.roomPositions[1]
        ], this.animationOptions);

        table.animate([
            this.tablePositions[2],
            this.tablePositions[1]
        ], this.animationOptions).addEventListener('finish', () => {
            table.animate([
                this.tablePositions[1],
                this.tablePositions[0]
            ], this.animationOptions);

            room.animate([
                this.roomPositions[1],
                this.roomPositions[0]
            ], this.animationOptions).addEventListener('finish', () => {
                animationFinished();
            });
        });
    }
}
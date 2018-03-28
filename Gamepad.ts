namespace BrowserUtils.Controllers {
    export class Gamepad {

        private triggerThreshold: number = .07;
        public controllers = {};

        //constructor() {
        //    window.addEventListener("gamepadconnected", this.connectHandler);
        //}

        public connectHandler(e) {
            this.controllers[e.index] = e;
        }

        public GetRightStick() {

            let xval: number = 0;
            let yval: number = 0;

            var gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

            //for (var i = 0; i < gamepads.length; i++) {

            //    console.log('gamepad ' + i);

            //    if (gamepads[i]) {

            //        console.log({
            //            'axis1': gamepads[i].axes ? gamepads[i].axes[0] : 'none', 
            //            'axis2': gamepads[i].axes ? gamepads[i].axes[1] : 'none',
            //            'axis3': gamepads[i].axes ? gamepads[i].axes[2] : 'none',
            //            'axis4': gamepads[i].axes ? gamepads[i].axes[3] : 'none'
            //        })
            //    }
            //}

            if (gamepads[1]) {

                let horizontal = gamepads[1].axes[2];
                let vertical = gamepads[1].axes[3];

                if (Math.abs(horizontal) > this.triggerThreshold || Math.abs(vertical) > this.triggerThreshold) {
                    if (horizontal < 0) {
                        xval = 16;
                    } else if (horizontal >= 0 && horizontal <= this.triggerThreshold) {
                        xval = 0;
                    }
                    else {
                        xval = 8;
                    }

                    if (vertical < 0) {
                        yval = 2;
                    } else if (vertical >= 0 && vertical <= this.triggerThreshold) {
                        yval = 0;
                    }
                    else {
                        yval = 4;
                    }
                } else {
                    return {
                        'xfactor': 0, 'yfactor': 0, 'direction': Direction.None
                    };
                }
                
                let currentDirection = Direction.None;
                let xy = xval + yval;

                let retval = {
                    'xfactor': Math.abs(horizontal), 'yfactor': Math.abs(vertical), 'direction': xy
                };
                
                return retval;
            }

            return {
                'xfactor': 0, 'yfactor': 0, 'direction': 0
            };
        }
    }

    export enum Direction {
        None = 0,
        Up = 2,
        Down = 4,
        Right = 8,
        Left = 16,
        UpRight = 10,
        UpLeft = 18,
        DownRight = 12,
        DownLeft = 20
    }
}
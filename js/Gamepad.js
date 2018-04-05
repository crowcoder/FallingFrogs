var BrowserUtils;
(function (BrowserUtils) {
    var Controllers;
    (function (Controllers) {
        var Gamepad = (function () {
            function Gamepad() {
                this.triggerThreshold = .07;
                this.controllers = {};
            }
            //constructor() {
            //    window.addEventListener("gamepadconnected", this.connectHandler);
            //}
            Gamepad.prototype.connectHandler = function (e) {
                this.controllers[e.index] = e;
            };
            Gamepad.prototype.GetRightStick = function () {
                var xval = 0;
                var yval = 0;
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
                if (gamepads[0]) {
                    var horizontal = gamepads[0].axes[2];
                    var vertical = gamepads[0].axes[3];
                    if (Math.abs(horizontal) > this.triggerThreshold || Math.abs(vertical) > this.triggerThreshold) {
                        if (horizontal < 0) {
                            xval = 16;
                        }
                        else if (horizontal >= 0 && horizontal <= this.triggerThreshold) {
                            xval = 0;
                        }
                        else {
                            xval = 8;
                        }
                    }
                    else {
                        return {
                            'xfactor': 0, 'yfactor': 0, 'direction': Direction.None
                        };
                    }
                    var currentDirection = Direction.None;
                    // let xy = xval + yval;
                    var retval = {
                        'xfactor': Math.abs(horizontal), 'yfactor': Math.abs(vertical), 'direction': xval //xy
                    };
                    return retval;
                }
                return {
                    'xfactor': 0, 'yfactor': 0, 'direction': 0
                };
            };
            return Gamepad;
        }());
        Controllers.Gamepad = Gamepad;
        (function (Direction) {
            Direction[Direction["None"] = 0] = "None";
            Direction[Direction["Up"] = 2] = "Up";
            Direction[Direction["Down"] = 4] = "Down";
            Direction[Direction["Right"] = 8] = "Right";
            Direction[Direction["Left"] = 16] = "Left";
            Direction[Direction["UpRight"] = 10] = "UpRight";
            Direction[Direction["UpLeft"] = 18] = "UpLeft";
            Direction[Direction["DownRight"] = 12] = "DownRight";
            Direction[Direction["DownLeft"] = 20] = "DownLeft";
        })(Controllers.Direction || (Controllers.Direction = {}));
        var Direction = Controllers.Direction;
    })(Controllers = BrowserUtils.Controllers || (BrowserUtils.Controllers = {}));
})(BrowserUtils || (BrowserUtils = {}));
//# sourceMappingURL=Gamepad.js.map
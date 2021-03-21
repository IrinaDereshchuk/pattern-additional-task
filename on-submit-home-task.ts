// 1) refactor code to pattern usage

// implementation in one js file
// const validate = ()  => {};
// let lastSSNVal;

// const onSubmit_One = (name, value) => {
//     let rows;
//     const ctrl = document.all(name);

//     if (top.utils.isNullOrUndefined(ctrl)) {
//         validate(name, value);
//         return;
//     }
//     ctrl.value = value;
//     if (ctrl.keepcr === "1") {
//         if (value === "") {
//             ctrl.rows = "2";
//         } else {
//             const mArr = value.split(/\r?\n/);
//             rows = mArr.length;

//             if (rows > 10) {
//                 rows = 10;
//             }
//             ctrl.rows = rows;
//         }
//     }

//     ctrl.style.backgroundColor = "";
//     ctrl.title = "";
// };

// // in second
// const onSubmit_Two = (name, value) => {
//     const ctrl = document.all(name);
//     if (top.utils.isNullOrUndefined(ctrl)) {
//         validate(name, value);
//         return;
//     }
//     ctrl.value = value;
//     if (ctrl.keepcr === '1') {
//         if (value === '') {
//             ctrl.rows = '2';
//         } else {
//             let rows = parseInt((value.length / parseInt(ctrl.cols)) + 1.35, 10);
//             if (rows > 10) {
//                 rows = 10;
//             }
//             ctrl.rows = rows;
//         }
//     }
//     if (name === "ssn") {
//         lastSSNVal = ctrl.ssnval;
//         ctrl.ssnval = ctrl.value;
//     }
//     ctrl.style.backgroundColor = '';
//     ctrl.title = '';
// };

// // 3d realization of submit
// const onSubmit_Three = (name, value) => {
//     parent.Form1.Validate.changed = true;
//     const ctrl = document.all(name);

//     if (top.utils.isNullOrUndefined(ctrl)) {
//         validate(name, value);
//         return;
//     }
//     ctrl.value = value;
//     ctrl.style.backgroundColor = '';
//     ctrl.title = '';
// };

// interface Handler {
//   setNext(handler: Handler): Handler;

//   handle(name: string, value: string, ctrl: any, rows?: any): string;
// }

// abstract class AbstractHandler implements Handler {
//   private nextHandler: Handler;

//   public setNext(handler: Handler) {
//     this.nextHandler = handler;

//     return handler;
//   }

//   public handle(name: string, value: string, ctrl: any, rows?: any): string {
//     if (this.nextHandler) {
//       return this.nextHandler.handle(name, value, ctrl, rows);
//     }

//     return null;
//   }
// }

// let lastSSNVal;

// class ValidateHandler extends AbstractHandler {
//   public handle(name: string, value: string, ctrl: any, rows?: any): string {
//     if (top.utils.isNullOrUndefined(ctrl)) {
//         this.validate(name, value);
//         return;
//     }

//     return super.handle(name, value, ctrl, rows);
//   }

//   private validate(name: string, value: string) {

//   }
// }

// class AssignValueToCtrlHandler extends AbstractHandler {
//   public handle(name: string, value: string, ctrl: any, rows?: any): string {
//     ctrl.value = value;

//     return super.handle(name, value, ctrl, rows);
//   }
// }

// class ResetBackgroundColorHandler extends AbstractHandler {
//   public handle(name: string, value: string, ctrl: any, rows?: any): string {
//     ctrl.style.backgroundColor = "";

//     return super.handle(name, value, ctrl, rows);
//   }
// }

// class ResetTitleHandler extends AbstractHandler {
//   public handle(name: string, value: string, ctrl: any, rows?: any): string {
//     ctrl.style.title = "";

//     return super.handle(name, value, ctrl, rows);
//   }
// }

// class SSNHandler extends AbstractHandler {
//   public handle(name: string, value: string, ctrl: any, rows?: any): string {
//     if (name === "ssn") {
//       lastSSNVal = ctrl.ssnval;
//       ctrl.ssnval = ctrl.value;
//     }

//     return super.handle(name, value, ctrl, rows);
//   }
// }

// class KeepCRHandler extends AbstractHandler {
//   public handle(name: string, value: string, ctrl: any, rows?: any): string {
//     if (ctrl.keepcr === '1') {
//       if (value === '') {
//           ctrl.rows = '2';
//       } else {
//           let rows = parseInt((value.length / parseInt(ctrl.cols)) + 1.35, 10);
//           if (rows > 10) {
//               rows = 10;
//           }
//           ctrl.rows = rows;
//       }
//     }

//     return super.handle(name, value, ctrl, rows);
//   }
// }

// class KeepCR1Handler extends AbstractHandler {
//   public handle(name: string, value: string, ctrl: any, rows?: any): string {
//     if (ctrl.keepcr === "1") {
//       if (value === "") {
//           ctrl.rows = "2";
//       } else {
//           const mArr = value.split(/\r?\n/);
//           rows = mArr.length;

//           if (rows > 10) {
//               rows = 10;
//           }
//           ctrl.rows = rows;
//       }
//   }

//     return super.handle(name, value, ctrl, rows);
//   }
// }

// class Client {
//   public static onSubmit1(): void {
//     const validateHandler = new ValidateHandler();
//     const assignValueToCtrlHandler = new AssignValueToCtrlHandler();
//     const keepCR1Handler = new KeepCR1Handler();

//     let rows;
//     const ctrl = document.all(name);
  
//     validateHandler.setNext(assignValueToCtrlHandler).setNext(keepCR1Handler);
//     validateHandler.handle('name', 'value', ctrl, rows);
//   }

//   public static onSubmit2(): void {
//     const validateHandler = new ValidateHandler();
//     const assignValueToCtrlHandler = new AssignValueToCtrlHandler();
//     const resetBackgroundColorHandler = new ResetBackgroundColorHandler();
//     const resetTitleHandler = new ResetTitleHandler();
//     const ssnHandler = new SSNHandler();
//     const keepCRHandler = new KeepCRHandler();

//     const ctrl = document.all(name);
  
//     validateHandler
//       .setNext(assignValueToCtrlHandler)
//       .setNext(keepCRHandler)
//       .setNext(ssnHandler)
//       .setNext(resetBackgroundColorHandler)
//       .setNext(resetTitleHandler);
//   }

//   public static onSubmit3(): void {
//     const validateHandler = new ValidateHandler();
//     const assignValueToCtrlHandler = new AssignValueToCtrlHandler();
//     const resetBackgroundColorHandler = new ResetBackgroundColorHandler();
//     const resetTitleHandler = new ResetTitleHandler();

//     parent.Form1.Validate.changed = true;
//     const ctrl = document.all(name);
  
//     validateHandler
//       .setNext(assignValueToCtrlHandler)
//       .setNext(resetBackgroundColorHandler)
//       .setNext(resetTitleHandler);
//   }
// }
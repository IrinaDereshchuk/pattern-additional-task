// 1) rewrite with structural pattern - what possible pattern?  - flyweight facade
function Book(title: string, isbn: string, author: string, ratings: number[]): void {
    this.title = title;
    this.isbn = isbn;
    this.author = author;
    this.ratings = ratings;

    this.getAverageReview = function(): number {
        const averageReview = (this.ratings.reduce((a, b) => a + b)) / this.ratings.length;

        return averageReview;
    };
}

interface IBook {
    title: string;
    isbn: string;
    author: string;
    ratings: number[];
    getAverageReview(): number;
}

class BooksFacade {
    public get(): Array<IBook> {
        const book1 = new Book('javascript, the definite guide', '0596335527', 'David Flanagan', [4, 5, 4, 3]);
        const book2 = new Book('ruby on rails', '05968053447', 'Harry Oliveer', [4, 5, 4, 3]);
        const book3 = new Book('Learning Python: Powerful Object-Oriented Programming', '0596805545', 'Mark Lutz', [4, 5, 4, 3]);

        return [book1, book2, book3];
    }
}

class Client1 {
    public static main(): void {
        const booksFacade = new BooksFacade();
        console.log(booksFacade.get());
    }
}

Client1.main();

// 2) rewrite with structural pattern -  what possible pattern? - adapter

class OldCalculator {
    public operations: (term1: number, term2: number, operation: string) => number;

    constructor() {
        this.operations = function(term1, term2, operation) {
            switch (operation) {
                case 'add':
                    return term1 + term2;
                case 'sub':
                    return term1 - term2;
                default:
                    return NaN;
            }
        };
    }
}

interface IAdaptedCalculator {
    add: (term1: number, term2: number) => number;
    sub: (term1: number, term2: number) => number;
}

class AdaptedCalculator implements IAdaptedCalculator {
    constructor(
      private oldCalculator: OldCalculator
    ) {}

    public add(term1: number, term2: number): number {
        const result = this.oldCalculator.operations(term1, term2, 'add');

        return result;
    }

    public sub(term1: number, term2: number): number {
        const result = this.oldCalculator.operations(term1, term2, 'sub');

        return result;
    }
}

class Client2 {
    public static main(): void {
        const calculator = new AdaptedCalculator(new OldCalculator());
        console.log(calculator.add(1, 2));
        console.log(calculator.sub(10, 2));
    }
}

Client2.main();

// 4) Add listener for input with type `number` and display two values (multiply number by three; add 5 to number)
// maybe strategy or state

// input.onchange((value) => {
//     displayMultiply()
//     displayAddTo5()
//   });

interface INumberOperationCommand {
    execute: (value: number) => number;
}

class MultiplyBy3Command implements INumberOperationCommand {
    public execute(value: number): number {
        return value * 3;
    }
}

class AddTo5Command implements INumberOperationCommand {
    public execute(value: number): number {
        return value + 5;
    }
}
class Input {
    private onChangeCommands: INumberOperationCommand[] = [];

    public setCommand(command: INumberOperationCommand): void {
        this.onChangeCommands.push(command);
    }

    public change(value: number): void {
        this.onChangeCommands.forEach((command) => {
            console.log(command.execute(value));
        });
    }
}

class Client4 {
    public static main(): void {
        const input = new Input();
        input.setCommand(new AddTo5Command());
        input.setCommand(new MultiplyBy3Command());
        input.change(2);
    }
}

Client4.main();

// 5) What pattern can be used to maintain data store? - observable, singelton

// 6) you are working with online-shop
// combine methods getCart(), that returns all items from cart, removeItemFromCart(), addItemToCart() in one instance - what pattern better to use here

class Cart {
    protected static instance: Cart = null;

    public getCart(): void {
        console.log('all items');
    }

    public removeItemFromCart(): void {
        console.log('removeItemFromCart');
    }

    public addItemToCart(): void {
        console.log('addItemToCart');
    }

    public static getInstance(): Cart {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }
}

class Client6 {
    public static main(): void {
        const cart = Cart.getInstance();
        cart.addItemToCart();
        cart.getCart();
        cart.removeItemFromCart();
    }
}

Client6.main();

// 7) you have some util file with described request method with all necessary data received via props, f.e. request = (method, URL, data) => {},
// inside of which is already processed default data for current website: token, host, etc..
// create a patchRequest, that will use existing request method inside - what design pattern can be used here?

// example of possible request declaration:

// const request = (method: string, url: string, data: string, headers: string, responseType: string = 'json') => {
//     let requestHeaders = {};

//     if (headers) {
//         requestHeaders = { ...headers };
//     }

//     const authToken = getToken();

//     if (authToken) {
//         requestHeaders['Authorization'] = `Bearer ${authToken}`;
//     }

//     return axios.request({
//         headers: requestHeaders,
//         responseType,
//         url,
//         method,
//         data
//     });
// };

// const patchRequest = (url: string, data: string, headers: string, responseType: string = 'json') => { // decarator
//     return request('PATCH', url, data, headers, responseType);
// }

// 8 Provide simple calculator, using Command pattern - commands history, cancelation

// abstract class Command {
//     protected backup: string;

//     constructor(protected app: Application, protected editor: Editor) {}

//     public undo(): void {
//         this.editor.text = this.backup;
//     }

//     protected saveBackup(): void {
//         this.backup = this.editor.text;
//     }

//     public abstract execute(): boolean;
// }

// class CopyCommand extends Command {
//     public execute(): boolean {
//         this.app.clipboard = this.editor.getSelection();

//         return false;
//     }
// }

// class CutCommand extends Command {
//     public execute(): boolean {
//         this.saveBackup();
//         this.app.clipboard = this.editor.getSelection();
//         this.editor.deleteSelection();

//         return true;
//     }
// }

// class PasteCommand extends Command {
//     public execute(): boolean {
//         this.saveBackup();
//         this.editor.replaceSelection(this.app.clipboard);

//         return true;
//     }
// }

// class UndoCommand extends Command {
//     public execute(): boolean {
//         this.app.undo();

//         return false;
//     }
// }

// class CommandHistory {
//     private history: Command[];

//     public push(command: Command): void {
//         this.history.push(command);
//     }

//     public pop(): Command {
//         return this.history.pop();
//     }
// }

// class Editor {
//     public text: string;

//     public getSelection(): string {
//         return this.text;
//     }

//     public deleteSelection(): void {
//         this.text = '';
//     }

//     public replaceSelection(text: string): void {
//         this.text = text;
//     }
// }

// class Application {
//     public clipboard: string;
//     public editors: Editor[];
//     public activeEditor: Editor[];
//     public history: CommandHistory;

//     public createUI(): void {
//         const copy = function(): void {
//             this.executeCommand(new CopyCommand(this, this.activeEditor));
//         };

//         copyButton.setCommand(copy);
//         shortcuts.onKeyPress("Ctrl+C", copy)
//     }

//     public executeCommand(command: Command): void {
//         if (command.execute()) {
//             this.history.push(command);
//         }
//     }

//     public undo(): void {
//         const command = this.history.pop();

//         if (command) {
//             command.undo();
//         }
//     }
// }

// abstract class Command {
//     protected backup: number;

//     constructor(protected calculationService: CalculationService) {}

//     public undo(): void {
//         this.editor.text = this.backup;
//     }

//     protected saveBackup(): void {
//         this.backup = this.editor.text;
//     }

//     public abstract execute(): boolean;
// }

// class CommandHistory {
//     private history: Command[];

//     public push(command: Command): void {
//         this.history.push(command);
//     }

//     public pop(): Command {
//         return this.history.pop();
//     }
// }
class Calculator {

}
class CalculationService {
    public add(term1: number, term2: number): number {
        return term1 + term2;
    }

    public sub(term1: number, term2: number): number {
        return term1 - term2;
    }

    public multiply(term1: number, term2: number): number {
        return term1 * term2;
    }

    public divide(term1: number, term2: number): number {
        return term1 / term2;
    }
}
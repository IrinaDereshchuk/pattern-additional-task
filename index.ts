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

abstract class Command {
    protected backup: number;

    constructor(
      protected calculationService: CalculationService,
      protected calculator: Calculator
    ) {}

    public undo(): void {
        this.calculator.currentValue = this.backup;
    }

    protected saveBackup(): void {
        this.backup = this.calculator.currentValue;
    }

    public abstract execute(secondOperand: number): boolean;
}

class AddCommand extends Command {
  public execute(secondOperand: number): boolean {
    this.saveBackup();
    this.calculator.currentValue = this.calculationService.add(this.calculator.currentValue, secondOperand);

    return true;
  }
}

class SubCommand extends Command {
  public execute(secondOperand: number): boolean {
    this.saveBackup();
    this.calculator.currentValue = this.calculationService.sub(this.calculator.currentValue, secondOperand);

    return true;
  }
}

class MultiplyCommand extends Command {
  public execute(secondOperand: number): boolean {
    this.saveBackup();
    this.calculator.currentValue = this.calculationService.multiply(this.calculator.currentValue, secondOperand);

    return true;
  }
}

class DivideCommand extends Command {
  public execute(secondOperand: number): boolean {
    this.saveBackup();
    this.calculator.currentValue = this.calculationService.divide(this.calculator.currentValue, secondOperand);

    return true;
  }
}

class CommandHistory {
    private stack: Command[] = [];

    public push(command: Command): void {
        this.stack.push(command);
    }

    public pop(): Command {
        return this.stack.pop();
    }
}
class Calculator {
  private history: CommandHistory = new CommandHistory();
  private addCommand: Command;
  private subCommand: Command;
  private multiplyCommand: Command;
  private divideCommand: Command;
  public currentValue: number = 0;

  public setAddCommand(command: Command): void {
    this.addCommand = command;
  }

  public setSubCommand(command: Command): void {
    this.subCommand = command;
  }

  public setMultiplyCommand(command: Command): void {
    this.multiplyCommand = command;
  }

  public setDivideCommand(command: Command): void {
    this.divideCommand = command;
  }

  public undo(): void {
      const command = this.history.pop();

      if (command) {
          command.undo();
      }
  }

  public add(value: number): void {
    this.executeCommand(this.addCommand, value);
  }

  public sub(value: number): void {
    this.executeCommand(this.subCommand, value);
  }

  public multiply(value: number): void {
    this.executeCommand(this.multiplyCommand, value);
  }

  public divide(value: number): void {
    this.executeCommand(this.divideCommand, value);
  }

  private executeCommand(command: Command, secondOperand: number): void {
    if (command.execute(secondOperand)) {
        this.history.push(command);
    }
  }
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

class CalculatorClient {
  public static main(): void {
    const calculator = new Calculator();
    calculator.setAddCommand(new AddCommand(new CalculationService(), calculator));
    calculator.setSubCommand(new SubCommand(new CalculationService(), calculator));
    calculator.setMultiplyCommand(new MultiplyCommand(new CalculationService(), calculator));
    calculator.setDivideCommand(new DivideCommand(new CalculationService(), calculator));
    calculator.add(2);
    console.log(calculator.currentValue);
    calculator.undo();
    calculator.undo();
    console.log(calculator.currentValue);
    calculator.add(10);
    calculator.sub(2);
    calculator.divide(2);
    console.log(calculator.currentValue);
    calculator.multiply(4);
    console.log(calculator.currentValue);
    calculator.undo();
    console.log(calculator.currentValue);
  }
}

CalculatorClient.main();
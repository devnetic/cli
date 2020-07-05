interface Answers {
    [key: string]: string;
}
interface Question {
    message: string;
    name: string;
    type: string;
}
interface Cli {
    epilog(text: string, color?: string): Cli;
    example(text: string, description: string, color?: string): Cli;
    getParams(params?: string[]): Record<string, string>;
    option(params: string[], description: string, color?: string): Cli;
    prompt(questions: Question[]): Promise<Answers>;
    show(): void;
    usage(text?: string, color?: string): Cli;
}
export declare const cli: Cli;
export {};

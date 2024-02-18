export class CreateTransactionDto {
    reason: string;
    type: 'INCOME' | 'OUTCOME' | undefined;
    amount: number;
    sourceId: string;
}

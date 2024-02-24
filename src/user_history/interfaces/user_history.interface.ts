export default interface UserHistoryInterface {
  readonly ubid: number;
  readonly user: number;
  readonly date: Date;
  readonly detail: string;
  readonly cost: number;
  readonly type: '+' | '-';
}

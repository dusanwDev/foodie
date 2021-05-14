export class LogedInUser {
  constructor(
    private localId: string,
    private tokenId: string,
    private expDate: Date,
    private refreshToken: string,
    private email: string
  ) {}
  get token() {
    if (!this.expDate || new Date() > this.expDate) {
      return null;
    }

    return this.tokenId;
  }
  get userId() {
    return this.localId;
  }
}

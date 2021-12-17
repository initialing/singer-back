import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AccountDTO } from "src/dtos/account.dto";
import { Account, AccountDoc } from "src/schemas/account.schema";
import type { UpdateWriteOpResult } from "mongoose";

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel("Account") private accountModel: Model<AccountDoc>
    ) {}

    async setUser(accountDto: AccountDTO): Promise<Account> {
        const createUser = new this.accountModel(accountDto);
        return createUser.save();
    }

    async getUserByAccount(
        account: string,
        password: string
    ): Promise<Account> {
        const act: Account = await this.accountModel.findOne(
            {
                account: account,
                password: password,
            },
            { _id: 1, account: 1, password: 1 }
        );
        return act;
    }

    async changePassword(account: string, password: string): Promise<number> {
        const res: UpdateWriteOpResult = await this.accountModel.updateOne(
            { account: account },
            { $set: { password: password } }
        );
        return res.matchedCount;
    }
}

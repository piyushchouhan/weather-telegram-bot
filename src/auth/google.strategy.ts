import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCalback } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { first } from "rxjs";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ){
        super({
            clientID: configService.get("GOOGLE_CLIENT_ID"),
            clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ["email", "profile"]
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCalback,
    ): Promise<any> {
        const {name, emails} = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            accessToken,
        };

        const payload = {
            user,
            accessToken,
        };

        done(null, payload);
    }
}
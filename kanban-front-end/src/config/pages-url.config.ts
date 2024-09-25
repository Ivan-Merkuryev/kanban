import { EnumTokens, decoderToken } from "@/services/auth-token.service";
import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";

class DASHBOARD {
  token = Cookies.get("accessToken");
  id = (): string | null => (this.tokenData ? this.tokenData.id : null);

  get tokenData() {
    return decoderToken(this.token);
  }
  private root = "/i";

  HOME = "/";
  AUTH = "/auth";
  // PROFILE = `${this.root}/profile?id=${this.id()}`;
  PROFILE = `${this.root}/profile`;
  TASKS = `${this.root}/list`;
  CREATE = `${this.root}/create`;
  TIMER = `${this.root}/timer`;
  TIME_BLOCKING = `${this.root}/time-blocking`;
  SETTINGS = `${this.root}/settings`;
}

export const DASHBOARD_PAGES = new DASHBOARD();

import api from "./api";

import type { FinancialInsightsResponse } from "../types/insights";

const insightsService = {
  async getInsights(): Promise<FinancialInsightsResponse> {
    const { data } =
      await api.get<FinancialInsightsResponse>(
        "/insights"
      );

    return data;
  },
};

export default insightsService;
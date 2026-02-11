/**
 * Financial Engine Utilities
 * Implements the 10% commission logic and settlement calculations.
 */

export interface SettlementResult {
    totalFare: number;
    platformCommission: number; // 10%
    driverPayout: number; // 90%
    taxAmount: number;
    netToPlatform: number;
}

/**
 * Calculates the settlement breakdown for a completed trip.
 * @param fare The total fare amount proposed/matched.
 * @returns SettlementResult object.
 */
export const calculateSettlement = (fare: number): SettlementResult => {
    const COMMISSION_RATE = 0.10;
    const TAX_RATE = 0.15; // Assume 15% VAT/Sales Tax on the commission portion or total depends on local laws

    const platformCommission = fare * COMMISSION_RATE;
    const driverPayout = fare - platformCommission;

    // Tax is usually calculated on the service fee (commission)
    const taxAmount = platformCommission * TAX_RATE;
    const netToPlatform = platformCommission - taxAmount;

    return {
        totalFare: Number(fare.toFixed(2)),
        platformCommission: Number(platformCommission.toFixed(2)),
        driverPayout: Number(driverPayout.toFixed(2)),
        taxAmount: Number(taxAmount.toFixed(2)),
        netToPlatform: Number(netToPlatform.toFixed(2))
    };
};

/**
 * Predicts revenue velocity based on active negotiations.
 * @param negotiations Active negotiations list.
 * @returns Estimated potential commission.
 */
export const estimatePotentialRevenue = (negotiations: any[]): number => {
    return negotiations.reduce((total, neg) => {
        const potentialFare = neg.matchPrice || neg.riderProposedFare;
        return total + (potentialFare * 0.10);
    }, 0);
};

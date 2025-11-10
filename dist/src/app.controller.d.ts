import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly logger;
    constructor(appService: AppService);
    handleOrderWebhook(orderData: any, shopDomain: string): Promise<{
        status: string;
    } | undefined>;
    getOrders(): Promise<{
        id: number;
        shopDomain: string;
        shopifyOrderId: string;
        totalPrice: string | null;
        customerEmail: string | null;
        createdAt: Date;
    }[]>;
}

const eventEmitter = require("#root/src/infrastructure/events/inventory.js");
const AppError = require("#root/src/shared/constants/errors/AppError.js");

exports.webhook = (req, res) => {
    try {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();

        const sendEvent = (eventType, data) => {
            const response = {
                data,
                type: null,
                message: `${eventType} event triggered`,
                event: eventType
            };
            res.write(`event: ${eventType}\n`);
            res.write(`data: ${JSON.stringify(response)}\n\n`);
        };

        const onStockIn = (data) => sendEvent('stock_in', data);
        const onStockOut = (data) => sendEvent('stock_out', data);
        const onStockDuplicates = (data) => sendEvent('stock_duplicates', data);

        eventEmitter.on('stock_in', onStockIn);
        eventEmitter.on('stock_out', onStockOut);
        eventEmitter.on('stock_duplicates', onStockDuplicates);

        req.on('close', () => {
            eventEmitter.off('stock_in', onStockIn);
            eventEmitter.off('stock_out', onStockOut);
            res.end();
        });
    } catch (error) {
        console.error('[UNHANDLED SSE ERROR]:', err.message);
    }
}
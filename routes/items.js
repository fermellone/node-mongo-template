const { Router } = require('express');

const ItemsService = require('../services/items');

const itemsApi = (app) => {
    const router = new Router();

    app.use('/api/items', router);

    const itemsService = new ItemsService();

    router.get('/', async (req, res, next) => {
        const { tags } = req.query;

        try {
            const items = await itemsService.getItems({ tags });

            res.status(200).json({
                data: items,
                message: 'items listed'
            });

        } catch (err) {
            next(err);
        }
    });

    router.get('/:itemId', async (req, res, next) => {
        const itemId = req.params.itemId;

        try {
            const item = await itemsService.getItem({ itemId });

            res.status(200).json({
                data: item,
                message: 'item retrieved'
            });

        } catch (err) {
            next(err);
        }
    });

    router.post('/', async (req, res, next) => {
        const { body: item } = req;

        try {
            const createdItemId = await itemsService.createItem({ item });

            res.status(201).json({
                data: createdItemId,
                message: 'item created'
            });

        } catch (err) {
            next(err);
        }
    });

    router.put('/:itemId', async (req, res, next) => {
        const itemId = req.params.itemId;
        const { body: item } = req;

        try {
            const updatedItemId = await itemsService.updateItem({ itemId, item });

            res.status(200).json({
                data: updatedItemId,
                message: 'item updated'
            });

        } catch (err) {
            next(err);
        }
    });

    router.delete('/:itemId', async (req, res, next) => {
        const itemId = req.params.itemId;
        
        try {
            const deletedItemId = await itemsService.deleteItem({ itemId });

            res.status(200).json({
                data: deletedItemId,
                message: 'item deleted'
            });

        } catch (err) {
            next(err);
        }
    });
};

module.exports = itemsApi;
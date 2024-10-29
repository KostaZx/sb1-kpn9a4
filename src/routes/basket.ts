import { Router } from 'express';
import { tebex } from '../lib/tebex';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { complete_url, cancel_url, custom, complete_auto_redirect, ipAddress } = req.body;
    const basket = await tebex.createBasket(
      complete_url,
      cancel_url,
      custom,
      complete_auto_redirect,
      ipAddress
    );
    res.json(basket);
  } catch (error) {
    next(error);
  }
});

router.post('/minecraft', async (req, res, next) => {
  try {
    const { username, complete_url, cancel_url, custom, complete_auto_redirect, ipAddress } = req.body;
    const basket = await tebex.createMinecraftBasket(
      username,
      complete_url,
      cancel_url,
      custom,
      complete_auto_redirect,
      ipAddress
    );
    res.json(basket);
  } catch (error) {
    next(error);
  }
});

router.get('/:basketIdent', async (req, res, next) => {
  try {
    const { basketIdent } = req.params;
    const basket = await tebex.getBasket(basketIdent);
    res.json(basket);
  } catch (error) {
    next(error);
  }
});

router.post('/:basketIdent/packages', async (req, res, next) => {
  try {
    const { basketIdent } = req.params;
    const { package_id, quantity, type, variable_data } = req.body;
    const result = await tebex.addPackageToBasket(
      basketIdent,
      package_id,
      quantity,
      type,
      variable_data
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:basketIdent/packages/:packageId', async (req, res, next) => {
  try {
    const { basketIdent, packageId } = req.params;
    await tebex.removePackage(basketIdent, Number(packageId));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.patch('/:basketIdent/packages/:packageId', async (req, res, next) => {
  try {
    const { basketIdent, packageId } = req.params;
    const { quantity } = req.body;
    const result = await tebex.updateQuantity(basketIdent, Number(packageId), quantity);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/:basketIdent/gift', async (req, res, next) => {
  try {
    const { basketIdent } = req.params;
    const { package_id, target_username_id } = req.body;
    const result = await tebex.giftPackage(basketIdent, package_id, target_username_id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:basketIdent/auth-url', async (req, res, next) => {
  try {
    const { basketIdent } = req.params;
    const { returnUrl } = req.query;
    const authUrl = await tebex.getBasketAuthUrl(basketIdent, returnUrl as string);
    res.json({ authUrl });
  } catch (error) {
    next(error);
  }
});

export const basketRouter = router;
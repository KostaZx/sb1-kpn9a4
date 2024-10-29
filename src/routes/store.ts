import { Router } from 'express';
import { tebex } from '../lib/tebex';

const router = Router();

router.get('/categories', async (req, res, next) => {
  try {
    const { includePackages, basketIdent, ipAddress } = req.query;
    const categories = await tebex.getCategories(
      includePackages === 'true',
      basketIdent as string,
      ipAddress as string
    );
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/categories/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { includePackages, basketIdent, ipAddress } = req.query;
    const category = await tebex.getCategory(
      Number(id),
      includePackages === 'true',
      basketIdent as string,
      ipAddress as string
    );
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.get('/packages', async (req, res, next) => {
  try {
    const { basketIdent, ipAddress } = req.query;
    const packages = await tebex.getPackages(
      basketIdent as string,
      ipAddress as string
    );
    res.json(packages);
  } catch (error) {
    next(error);
  }
});

router.get('/packages/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { basketIdent, ipAddress } = req.query;
    const package_ = await tebex.getPackage(
      Number(id),
      basketIdent as string,
      ipAddress as string
    );
    res.json(package_);
  } catch (error) {
    next(error);
  }
});

router.get('/webstore', async (_req, res, next) => {
  try {
    const webstore = await tebex.getWebstore();
    res.json(webstore);
  } catch (error) {
    next(error);
  }
});

export const storeRouter = router;
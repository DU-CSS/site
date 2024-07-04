import db from '$db/mongo';

export const products = db.collection('Products')

export const events = db.collection('Events')
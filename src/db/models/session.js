import { model, Schema } from 'mongoose';

const sessionSchema = new Schema({
  userId: { type: String, required: true }, // type: Schema.Types.ObjectId, ref: 'user'
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  accessTokenValidUntil: { type: Date, required: true },
  refreshTokenValidUntil: { type: Date, required: true },
});

export const Session = model('session', sessionSchema);

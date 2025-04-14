import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolioItem extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioItemSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], default: [] },
  tags: { type: [String], default: [] }
}, {
  timestamps: true
});

export default mongoose.model<IPortfolioItem>('PortfolioItem', PortfolioItemSchema);
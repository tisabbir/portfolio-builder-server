import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile: {
    fullName: string;
    title: string;
    bio: string;
    avatar: string;
    links: {
      website?: string;
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
    skills: string[];
  };
  portfolioSettings: {
    isPublic: boolean;
    customDomain?: string;
    theme: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    fullName: { type: String, default: '' },
    title: { type: String, default: '' },
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' },
    links: {
      website: { type: String, default: '' },
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' }
    },
    skills: { type: [String], default: [] }
  },
  portfolioSettings: {
    isPublic: { type: Boolean, default: true },
    customDomain: { type: String, default: '' },
    theme: { type: String, default: 'default' }
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
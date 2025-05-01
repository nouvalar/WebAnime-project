import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    animeId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Membuat compound index untuk mencegah duplikasi watchlist
watchlistSchema.index({ userId: 1, animeId: 1 }, { unique: true });

const Watchlist = mongoose.models.Watchlist || mongoose.model('Watchlist', watchlistSchema);

export default Watchlist; 
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import ApkAndroid from './pages/posts/ApkAndroid';
import Hd4k from './pages/posts/Hd4k';
import PcWindows from './pages/posts/PcWindows';
import IosIphone from './pages/posts/IosIphone';
import Username from './pages/posts/Username';

const App = () => {
    return (
        <>
            <div className="bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />

                {/* Blog Post Routes - matched to existing URLs */}
                <Route path="/tiktok-video-downloader-apk-android.html" element={<ApkAndroid />} />
                <Route path="/tiktok-video-downloader-4k-hd.html" element={<Hd4k />} />
                <Route path="/tiktok-video-downloader-for-pc.html" element={<PcWindows />} />
                <Route path="/tiktok-video-downloader-iphone-ios.html" element={<IosIphone />} />
                <Route path="/download-tiktok-videos-by-username.html" element={<Username />} />

                {/* Catch all redirect to home */}
                <Route path="*" element={<Home />} />
            </Routes>

            <Footer />
        </>
    );
};

export default App;

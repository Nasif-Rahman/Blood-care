

const SiteInfo = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">সাইট সম্পর্কে তথ্য</h1>
      <div className="space-y-6 text-lg leading-relaxed bg-white p-6 rounded-lg shadow">

        <p>
          এই ওয়েবসাইটটি জনসেবামূলক উদ্দেশ্যে তৈরি করা হয়েছে। আমরা বিশ্বাস করি, রক্তদানের মাধ্যমে অনেক মানুষের জীবন রক্ষা ও বাঁচানো সম্ভব। 
          তাই এই প্ল্যাটফর্মটি সকলের জন্য উন্মুক্ত, এবং সবাইকে অনুরোধ করা হচ্ছে সঠিক তথ্য প্রদান করতে — কারণ এটি সবার কল্যাণের জন্য।
        </p>

        <p>
          বর্তমানে সাইটটি সাতক্ষীরা জেলার কালিগঞ্জ উপজেলার জন্য তৈরি করা হয়েছে। 
          ভবিষ্যতে অন্যান্য উপজেলা ও অঞ্চলেও এই সেবাটি সম্প্রসারণের পরিকল্পনা রয়েছে। যেখানে ব্লাড ফাউন্ডেশনের সহযোগিতা পাওয়া গেলে দ্রুত তা চালু করা হবে।
        </p>

        <p>
          এই সাইটের মাধ্যমে রক্তদাতারা তাদের তথ্য আপডেট করতে পারবেন এবং রক্তপ্রয়োজনকারীরা সহজেই প্রয়োজনীয় রক্তদাতাদের খুঁজে পেতে পারবেন। 
          এছাড়া সর্বশেষ রক্তদানের তারিখও উল্লেখ থাকায় রক্তদাতার প্রস্তুতির বিষয়েও ধারণা পাওয়া যায়।
        </p>

        <p>
          তথ্য দিয়ে সার্বিক সহযোগিতায় ছিল যেসব ব্লাড ডোনেট ফাউন্ডেশন:
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>আমার ব্লাড ডোনেট ফাউন্ডেশন</li>
            <li>ব্লাড ডোনেট ফাউন্ডেশন</li>
          </ul>
        </p>

        <p>
          আপনার সহযোগিতা আমাদের জন্য অত্যন্ত মূল্যবান এবং এটি আমাদের কাজ চালিয়ে যাওয়ার অনুপ্রেরণা দেয়। 
          আসুন, সবাই মিলে “<span className="text-red-600 font-semibold">রক্ত দেই, জীবন বাঁচাই</span>” এই উদ্দেশ্যকে সফল করি।
        </p>

        <p>
          এই উদ্যোগের পেছনে ও ওয়েব অ্যাপ্লিকেশনটি ডেভেলপ করেছেন —
          <ul className="list-disc list-inside ml-4 mt-2">
            <li className="text-red-600 font-semibold">নাসিফ উর রহমান</li>
            <li className="text-red-600 font-semibold">জিএম রিয়াজ আহমেদ</li>
          </ul>
          <div className="mt-2">
            এবং সার্বিক সহযোগিতায় —
            <ul className="list-disc list-inside ml-4 mt-2">
              <li className="text-red-600 font-semibold">মীর মারুফ হোসেন</li>
            </ul>
          </div>
        </p>

       <p>
  <strong>যোগাযোগ:</strong> <br />
  যদি কোনও ভুল তথ্য থাকে বা আপনার কোন পরামর্শ থাকে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন। <br />
</p>

<div className="mt-4 flex gap-4 flex-wrap">
  <a
    href="tel:+8801765432109"
    className="inline-block bg-red-700 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
  >
    📞 কল করুন
  </a>
  <a
    href="https://wa.me/8801765432109"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
  >
    💬 WhatsApp করুন
  </a>
</div>


      </div>
    </div>
  );
};

export default SiteInfo;

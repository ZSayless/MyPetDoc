function SocialMediaSection({ socialMedia }) {
  const socialLinks = [
    { key: 'website', label: 'Personal Website' },
    { key: 'github', label: 'GitHub' },
    { key: 'linkedin', label: 'LinkedIn' }, 
    { key: 'facebook', label: 'Facebook' },
    { key: 'youtube', label: 'YouTube' },
    { key: 'tiktok', label: 'TikTok' }
  ];

  return (
    <div className="bg-[#F8F9FF] rounded-2xl mt-8">
      <div className="p-4">
        <h3 className="text-base font-medium mb-1">Social Media Links</h3>
        <p className="text-gray-600 text-sm">
          Manage your social media connections.
        </p>
      </div>

      <div className="bg-white rounded-2xl">
        {socialLinks.map((social, index) => (
          <div key={social.key} className={index > 0 ? 'border-t' : ''}>
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
              <div>
                <div className="font-medium">{social.label}</div>
                <div className="text-gray-600 mt-1">{socialMedia[social.key]}</div>
              </div>
              <span className="text-gray-400 text-xl">›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialMediaSection; 
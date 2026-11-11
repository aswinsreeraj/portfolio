import React, { useState } from 'react';
import { Copy, Check, Download, MapPin, Clock, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon } from '../components/SocialIcons';
import { profile } from '../data/profile';
import { Footer } from '../components/Footer';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject || 'Backend Engineering Opportunity')}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setFormSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0A171D] text-[#101820] dark:text-[#E6F4F8] transition-colors">
      {/* Top Banner */}
      <section className="w-full py-14 bg-[#F3FAFD] dark:bg-[#0E1F27] border-b border-[#D6E7EE] dark:border-[#1E3A47]">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-16 flex flex-col gap-4">
          <div className="font-mono text-[13px] text-[#00708C] dark:text-[#00ADD8]">
            // package contact (handler.go)
          </div>
          <h1 className="m-0 text-[36px] sm:text-[48px] font-bold tracking-tight text-[#101820] dark:text-white leading-[1.05]">
            Let's talk.
          </h1>
          <p className="m-0 text-[17px] sm:text-[18px] text-[#3C4C57] dark:text-[#B9D3DC] leading-relaxed max-w-[760px]">
            I am actively exploring backend and distributed systems engineering opportunities. Whether you have an open role, an interesting architecture challenge, or want to discuss Go concurrency—reach out directly.
          </p>
        </div>
      </section>

      <main className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-14 w-full flex-1 flex flex-col gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Primary Email Card matching reference style */}
            <div className="p-6 rounded-[14px] bg-[#0E1F27] border border-[#1E3A47] text-[#E6F4F8] shadow-lg flex flex-col gap-4">
              <div className="text-[12px] font-mono text-[#00ADD8] tracking-wide font-semibold">
                // smtp.direct
              </div>
              <div>
                <div className="text-[18px] font-mono font-bold text-white">
                  {profile.email}
                </div>
                <div className="text-[13px] text-[#8DB1BE] mt-1 font-sans">
                  Email is monitored multiple times a day.
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md bg-[#0A171D] hover:bg-[#12242D] text-[13px] font-mono text-[#FDDD00] border border-[#FDDD00]/40 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy email</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  className="py-2.5 px-5 rounded-md bg-[#FDDD00] hover:bg-[#ebd000] text-[13px] font-mono text-[#101820] font-bold shadow-sm transition-transform active:scale-95"
                >
                  Open Mail
                </a>
              </div>
            </div>

            {/* Quick Meta Details */}
            <div className="p-6 rounded-[14px] bg-white dark:bg-[#0E1F27] border border-[#C9DCE4] dark:border-[#1E3A47] flex flex-col gap-3.5 text-[13px] font-mono">
              <div className="flex items-center gap-3 text-[#3C4C57] dark:text-[#B9D3DC]">
                <MapPin className="w-4 h-4 text-[#00708C] dark:text-[#00ADD8] flex-shrink-0" />
                <span>{profile.location} (Open to Remote & Relocation)</span>
              </div>
              <div className="flex items-center gap-3 text-[#3C4C57] dark:text-[#B9D3DC]">
                <Clock className="w-4 h-4 text-[#00708C] dark:text-[#00ADD8] flex-shrink-0" />
                <span>IST (UTC+5:30) · Typical overlap with US/EU/APAC</span>
              </div>
              <div className="pt-2 border-t border-[#D6E7EE]/60 dark:border-[#1E3A47] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ADD8] animate-pulse" />
                <span className="text-[#101820] dark:text-white font-semibold">{profile.availability}</span>
              </div>
            </div>

            {/* Resume Download Box */}
            <div className="p-6 rounded-[14px] bg-[#F5F8FA] dark:bg-[#0E1F27] border border-[#D6E7EE] dark:border-[#1E3A47] flex items-center justify-between">
              <div>
                <h3 className="m-0 text-[15px] font-bold text-[#101820] dark:text-white">
                  Full Resume
                </h3>
                <p className="m-0 text-[12px] font-mono text-[#4A5B66] dark:text-[#8DB1BE] mt-0.5">
                  Aswin Sreeraj · Backend & Distributed Systems
                </p>
              </div>
              <a
                href={profile.resumeUrl}
                download="Aswin_Sreeraj.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FDDD00] hover:bg-[#ebd000] text-[#101820] border border-[#101820] rounded-md font-mono text-[13px] font-bold shadow-yellow-solid transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-[#C9DCE4] dark:border-[#1E3A47] hover:border-[#00ADD8] bg-white dark:bg-[#0E1F27] flex flex-col items-center justify-center text-center gap-1.5 transition-colors group"
              >
                <GithubIcon className="w-5 h-5 text-[#101820] dark:text-white group-hover:text-[#00ADD8]" />
                <span className="text-[12px] font-mono text-[#4A5B66] dark:text-[#8DB1BE]">GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-[#C9DCE4] dark:border-[#1E3A47] hover:border-[#00ADD8] bg-white dark:bg-[#0E1F27] flex flex-col items-center justify-center text-center gap-1.5 transition-colors group"
              >
                <LinkedinIcon className="w-5 h-5 text-[#101820] dark:text-white group-hover:text-[#00ADD8]" />
                <span className="text-[12px] font-mono text-[#4A5B66] dark:text-[#8DB1BE]">LinkedIn</span>
              </a>
              <a
                href={profile.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-[#C9DCE4] dark:border-[#1E3A47] hover:border-[#00ADD8] bg-white dark:bg-[#0E1F27] flex flex-col items-center justify-center text-center gap-1.5 transition-colors group"
              >
                <YoutubeIcon className="w-5 h-5 text-[#101820] dark:text-white group-hover:text-[#00ADD8]" />
                <span className="text-[12px] font-mono text-[#4A5B66] dark:text-[#8DB1BE]">YouTube</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-[14px] bg-white dark:bg-[#0E1F27] border border-[#C9DCE4] dark:border-[#1E3A47] shadow-sm flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="m-0 text-[22px] font-bold text-[#101820] dark:text-white">
                  Send a fast message
                </h2>
                <p className="m-0 text-[13px] font-mono text-[#4A5B66] dark:text-[#8DB1BE]">
                  Sends directly to my inbox via your preferred mail client.
                </p>
              </div>

              {formSent ? (
                <div className="p-6 rounded-xl bg-[#E1F6FB] dark:bg-[#16303B] border border-[#00ADD8] text-center flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#00ADD8] text-white flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="m-0 text-[16px] font-bold text-[#00536A] dark:text-white">
                    Mail client triggered!
                  </h3>
                  <p className="m-0 text-[13px] text-[#3C4C57] dark:text-[#B9D3DC]">
                    If your email app did not open, write directly to <strong>{profile.email}</strong>.
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="text-[12px] font-mono text-[#00708C] dark:text-[#00ADD8] underline mt-2 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-mono text-[#101820] dark:text-[#E6F4F8] font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-md border border-[#BFD8E1] dark:border-[#2B4E5E] bg-white dark:bg-[#0A171D] text-[#101820] dark:text-white focus:border-[#00ADD8] outline-none text-[14px]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-mono text-[#101820] dark:text-[#E6F4F8] font-medium">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-md border border-[#BFD8E1] dark:border-[#2B4E5E] bg-white dark:bg-[#0A171D] text-[#101820] dark:text-white focus:border-[#00ADD8] outline-none text-[14px]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-mono text-[#101820] dark:text-[#E6F4F8] font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Backend Engineer role at [Company]"
                      className="w-full px-4 py-2.5 rounded-md border border-[#BFD8E1] dark:border-[#2B4E5E] bg-white dark:bg-[#0A171D] text-[#101820] dark:text-white focus:border-[#00ADD8] outline-none text-[14px]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-mono text-[#101820] dark:text-[#E6F4F8] font-medium">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Aswin, we're building a high-throughput platform in Go and saw your work on ARDA and EVNTX..."
                      className="w-full px-4 py-2.5 rounded-md border border-[#BFD8E1] dark:border-[#2B4E5E] bg-white dark:bg-[#0A171D] text-[#101820] dark:text-white focus:border-[#00ADD8] outline-none text-[14px] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[48px] rounded-md bg-[#FDDD00] hover:bg-[#ebd000] text-[#101820] border border-[#101820] font-bold text-[15px] flex items-center justify-center gap-2 shadow-yellow-solid cursor-pointer transition-transform active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer variant="about" />
    </div>
  );
};

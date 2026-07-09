import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import './Team.css';

// Map team member ID to image filename (exact as in /public/images/teams)
const memberImageMap: Record<string, string> = {
  tracey: 'Tracey Goldring.jpg',
  katarzyna: 'Dr. Katarzyna Lawniczek.jpg',
  marija: 'Dr. Marija Aleksoska.jpg',
  tamara: 'Tamara Sánchez.jpg',
  megan: 'Megan Louise.jpg',
};

const Team: React.FC = () => {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const members = t('team.members', { returnObjects: true }) as {
    id: string;
    name: string;
    role: string;
  }[];

  const groupImage = '/images/teams/teams.jpg';

  return (
    <section id="team" className={`team-section ${isDark ? 'dark' : 'light'}`}>
      {/* ====== Get to Know Us ====== */}
      <div className="team-group">
        <div className="team-group-image">
          <img src={groupImage} alt="Arches Dental Team" loading="lazy" />
          <div className="team-group-overlay">
            <h2 className="team-group-title">{t('team.title', 'GET TO KNOW US')}</h2>
            <p className="team-group-subtitle">
              {t('team.subtitle', 'Your Trusted Dental Clinic in Ciudad Quesada Since 2006')}
            </p>
            <div className="team-group-divider" />
            <p className="team-group-description">
              {t('team.description', 'At Arches British Dental Practice, we are dedicated to providing gentle, high-quality dental care in a friendly and relaxed environment. Since opening our doors in 2006, we have built a strong reputation among residents, seasonal visitors, and holiday-makers across Ciudad Quesada, Rojales, and the surrounding areas. Our mission is simple: to offer professional, honest, and comfortable dental care that puts patients first.')}
            </p>
          </div>
        </div>
      </div>

      {/* ====== Meet the Team ====== */}
      <div className="team-meet">
        <div className="team-meet-header">
          <h3 className="team-meet-title">{t('team.meetTitle', 'MEET THE TEAM')}</h3>
          <p className="team-meet-subtitle">
            {t('team.meetSubtitle', 'Dedicated Professionals Committed to Your Smile')}
          </p>
        </div>

        <div className="team-grid">
          {members.map((member) => {
            const filename = memberImageMap[member.id] || '';
            const src = `/images/teams/${encodeURIComponent(filename)}`;
            return (
              <figure
                className="team-card"
                key={member.id}
                style={{ ['--card-bg-image' as any]: `url(${src})` }}
              >
                <img src={src} alt={member.name} loading="lazy" />
                <figcaption>
                  <span className="team-card-name">{member.name}</span>
                  <span className="team-card-role">{member.role}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
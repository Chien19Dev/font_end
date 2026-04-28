'use client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const categories = [
  'Tất cả',
  'Xu hướng',
  'Công sở',
  'Street Style',
  'Cưới hỏi',
  'Phụ kiện',
  'Bền vững',
];

interface SectionCategoriesProps {
  tabIndex: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function SectionCategories({ tabIndex, onChange }: SectionCategoriesProps) {
  return (
    <section className="py-4 mb-0">
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={tabIndex}
          onChange={onChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#db2777',
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              color: '#6b7280',
              minWidth: 'auto',
              px: 2,
              '&:hover': { color: '#db2777' },
              '&.Mui-selected': { color: '#db2777', fontWeight: 700 },
            },
            '& .MuiTabs-scrollButtons': { color: '#db2777' },
          }}
        >
          {categories.map((category) => (
            <Tab key={category} label={category} />
          ))}
        </Tabs>
      </Box>
    </section>
  );
}

export { categories };

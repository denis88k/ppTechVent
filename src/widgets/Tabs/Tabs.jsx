import { Tab } from 'shared/ui/Tab/Tab';
import styles from './Tabs.module.scss';
import { TabList } from './model/path';

export const Tabs = ({ onTabSelect, tabSelect }) => {
	return (
		<div className={styles.Tabs}>
			<div className='container'>
				<div className={styles.Tabs__inner}>
					{TabList.map(tab => {
						const { name, text } = tab;
						return (
							<Tab
								key={name}
								activeTab={name === tabSelect}
								// className={tab.name === tabSelect ? 'active' : ''}
								onClick={() => {
									onTabSelect(name);
								}}
								text={text}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

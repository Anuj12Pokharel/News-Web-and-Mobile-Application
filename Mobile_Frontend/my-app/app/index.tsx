import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Linking, 
  Dimensions, 
  StatusBar 
} from 'react-native';
import axios from 'axios';

const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
const BACKEND_URL = 'http://192.168.18.198:8000/api/news/';

const App = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');

  // Fetch news based on selected category
  const fetchNews = useCallback(async () => {
    try {
      const response = await axios.get(BACKEND_URL, {
        params: { category }
      });
      // API is expected to return articles under the "articles" key.
      setNews(response.data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }, [category]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Split news: first article is featured, remaining are split between two columns
  const featuredArticle = news[0];
  const remainingNews = news.slice(1);
  const leftNews = remainingNews.filter((_, index) => index % 2 === 0);
  const rightNews = remainingNews.filter((_, index) => index % 2 !== 0);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0056b3" barStyle="light-content" />
      
      {/* Header with App Title and Categories */}
      <View style={styles.header}>
        <Text style={styles.logo}>News App</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((cat) => (
            <TouchableOpacity key={cat} onPress={() => setCategory(cat)}>
              <Text style={[styles.categoryText, category === cat && styles.activeCategory]}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Trending Topics Section */}
      <View style={styles.trendingContainer}>
        <Text style={styles.trendingLabel}>Trending:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['OpenAI', 'Target boycott', 'Emma Raducanu', "Tiny island 'golden'"].map((topic, index) => (
            <TouchableOpacity key={index} style={styles.trendingItem}>
              <Text style={styles.trendingText}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Featured Article */}
        {featuredArticle && (
          <View style={styles.featuredArticle}>
            <Image 
              source={{ uri: featuredArticle.image || 'https://via.placeholder.com/600x400?text=No+Image' }} 
              style={styles.featuredImage}
              resizeMode="cover"
            />
            <Text style={styles.featuredTitle}>{featuredArticle.title}</Text>
            <Text style={styles.featuredDescription}>
              {featuredArticle.description
                ? featuredArticle.description.slice(0, 150) + '...'
                : 'No description available.'}
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL(featuredArticle.url)}>
              <Text style={styles.readMore}>Read More</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Two Column Articles Grid */}
        <View style={styles.articlesGrid}>
          <View style={styles.column}>
            {leftNews.length > 0 ? (
              leftNews.map((article, index) => (
                <View key={index} style={styles.articleCard}>
                  <Image 
                    source={{ uri: article.image || 'https://via.placeholder.com/300x200?text=No+Image' }}
                    style={styles.articleImage}
                    resizeMode="cover"
                  />
                  <View style={styles.articleContent}>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                    <Text style={styles.articleDescription}>
                      {article.description 
                        ? article.description.slice(0, 100) + '...'
                        : 'No description available.'}
                    </Text>
                    <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
                      <Text style={styles.readMoreSmall}>Read More</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noNews}>No more news available.</Text>
            )}
          </View>
          <View style={styles.column}>
            {rightNews.length > 0 ? (
              rightNews.map((article, index) => (
                <View key={index} style={[styles.articleCard, styles.smallCard]}>
                  <Image 
                    source={{ uri: article.image || 'https://via.placeholder.com/300x200?text=No+Image' }}
                    style={styles.articleImage}
                    resizeMode="cover"
                  />
                  <View style={styles.articleContent}>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                    <Text style={styles.articleDescription}>
                      {article.description 
                        ? article.description.slice(0, 100) + '...'
                        : 'No description available.'}
                    </Text>
                    <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
                      <Text style={styles.readMoreSmall}>Read More</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noNews}>No additional news available.</Text>
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 News App. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

// Retrieve device dimensions for dynamic sizing
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0056b3',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    marginHorizontal: 10,
    color: '#fff',
    fontSize: 16,
  },
  activeCategory: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  trendingContainer: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  trendingLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  trendingItem: {
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 15,
  },
  trendingText: {
    color: '#333',
  },
  content: {
    padding: 10,
    paddingBottom: 50,
  },
  featuredArticle: {
    marginBottom: 20,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featuredDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  readMore: {
    color: '#CC0000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  articlesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  articleCard: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  smallCard: {
    // Optional: adjust padding or sizing for smaller cards if needed
  },
  articleImage: {
    width: '100%',
    height: 120,
  },
  articleContent: {
    padding: 10,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  articleDescription: {
    fontSize: 12,
    marginBottom: 5,
  },
  readMoreSmall: {
    color: '#CC0000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noNews: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#999',
  },
  footer: {
    marginTop: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
});

export default App;

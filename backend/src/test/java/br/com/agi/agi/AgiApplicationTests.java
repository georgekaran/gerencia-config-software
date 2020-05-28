package br.com.agi.agi;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@TestPropertySource(
		locations = "classpath:application-integrationtest.properties")
public class AgiApplicationTests {

	@Autowired
	TestConfig testConfig;

	@Test
	public void contextLoads() {
		cleanDatabase();
	}

	public void cleanDatabase() {
		testConfig.clean();
	}

}

package testobject;
// Generated 2016-5-20 23:45:10 by Hibernate Tools 3.4.0.CR1

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * UserStrategy generated by hbm2java
 */
@Entity
@Table(name = "user_strategy", catalog = "superquant")
public class UserStrategy implements java.io.Serializable {

	private UserStrategyId id;

	public UserStrategy() {
	}

	public UserStrategy(UserStrategyId id) {
		this.id = id;
	}

	@EmbeddedId

	@AttributeOverrides({ @AttributeOverride(name = "userId", column = @Column(name = "userID", nullable = false) ),
			@AttributeOverride(name = "strategy", column = @Column(name = "strategy", nullable = false, length = 20) ) })
	public UserStrategyId getId() {
		return this.id;
	}

	public void setId(UserStrategyId id) {
		this.id = id;
	}

}
